const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenValidation = require('../libs/verifyToken');
const helpers = require('../libs/libs');
const path = require('path');
const fs = require('fs-extra');
const Book = require('../models/Book');

// Hash Password for security my bro
const hashPasswords = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}

// Validating password bro
const validatePassword = async (password, passwordFromRequest) => {
    return await bcrypt.compare(password, passwordFromRequest)
}

router.post('/register', async(req, res) => {
    try {
        const {userName, email, password, role, adress, fullName, age, telephoneNumber, dni} = req.body;
        // Check if user already exist
        const userByNameExist = await User.findOne({userName});
        
        if(userByNameExist){
            return res.status(400).json({msg: 'Nombre de usuario ya existe.'})
        }
        const userByEmailExist = await User.findOne({email});
        if(userByEmailExist){
            return res.status(400).json({msg: 'El email ya está en uso.'})
        }
        const newUser = new User({
            userName, email, password
        });
        if(role !== ''){
            Object.assign(newUser, {
                role: role,
                adress: adress,
                fullName: fullName,
                age: age,
                telephoneNumber: telephoneNumber,
                dni: dni
            });
        }
        newUser.password = await hashPasswords(password);
        const userSaved = await newUser.save();
        return res.json(userSaved);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.put('/user', async(req, res) => {
    try {
        const {userName, email, password, password2, adress, fullName, age, user_id, imgUrl, telephoneNumber, dni, role} = req.body;
        const userExist = await User.findById(user_id);
        const userByNameExist = await User.findOne({userName});
        if(userByNameExist && userByNameExist._id != user_id){
            return res.status(400).json({msg: 'El nombre de usuario ya está en uso.'})
        }
        const userByEmailExist = await User.findOne({email});
        if(userByEmailExist && userByEmailExist._id != user_id){
            return res.status(400).json({msg: 'El email ya está en uso.'})
        }
        if(!userExist){
            return res.status(400).json({msg: 'El usuario no existe.'})
        }
        const userToEdit = ({
            userName, email, adress, fullName, age, telephoneNumber, dni
        });
        if(password !== ''){
            if(req.body.password != req.body.password2){
                return res.status(400).json({msg: "Las contraseñas no coinciden."})
            }
            const passwordHashed = await hashPasswords(password);

            Object.assign(userToEdit, {password: passwordHashed});
        }
        if(role !== ''){
            Object.assign(userToEdit, {role: role});
        }
        if(imgUrl !== ''){
            Object.assign(userToEdit, {imgUrl: imgUrl});
        }
        const userEdited = await User.findByIdAndUpdate(user_id, userToEdit, {new: true});
        return res.status(200).json(userEdited);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.post('/login', async(req, res) => {
    try {
        const {userName, password} = req.body;
        // Searching for user
        let userExist = await User.findOne({userName});
        //Check is username is correct
        if(!userExist){
            return res.status(400).json({msg: 'El nombre de usuario no existe.'})
        }
        //Validating password
        const isMatch = await bcrypt.compare(password, userExist.password);

        if(!isMatch){
            return res.status(400).json({msg: 'La contraseña es incorrecta.'})
        }
        
        const token = jwt.sign({id: userExist.id}, 'rashumulukaska', {expiresIn: 86400});
        let userWithToken = {...userExist._doc};
        const tokenValue = {token: token};
        Object.assign(userWithToken, tokenValue);
        return res.json(userWithToken)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/me', tokenValidation, async(req, res) => {
    try {
        const userExist = await User.findById(req.userId);
        //Check is username is correct
        if(!userExist){
            return res.status(400).json({msg: 'El nombre de usuario no existe.'})
        }
        return res.json(userExist)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        //Check is username is correct
        if(!users){
            return res.status(400).json({msg: 'No existen usuario registrados.'})
        }
        return res.json(users)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/doctors', async(req, res) => {
    try {
        const doctors = await User.find({role: 'doctor'});
        //Check is username is correct
        if(!doctors){
            return res.status(400).json({msg: 'No hay doctores asignados.'})
        }
        return res.json(doctors)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/patients', async(req, res) => {
    try {
        const patients = await User.find({role: 'user'});
        //Check is username is correct
        if(!patients){
            return res.status(400).json({msg: 'No hay pacientes asignados.'})
        }
        return res.json(patients)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/patients/:id', async(req, res) => {
    try {
        const patient = await User.findOne({role: 'user', _id: req.params.id});
        //Check is username is correct
        if(!patient){
            return res.status(400).json({msg: 'Paciente no está asignado.'})
        }
        return res.json(patient)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.delete('/users/:id', tokenValidation, async(req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        const Books = await Book.deleteMany({patient_id: req.params.id});
        //Check is username is correct
        if(!user){
            return res.status(400).json({msg: 'El usuario no existe.'})
        }
        return res.json(user)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.post('/create', async (req, res) => {

    const saveImage =  async () => {

        const imgUrl = helpers.randomNumber();

        const images = await User.find({ imgUrl: imgUrl });

        if(images.length > 0){
            saveImage();
        } else {

                const imageTempPath = req.file.path;

                const ext = path.extname(req.file.originalname).toLocaleLowerCase();

                const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

                if(ext === '.png' || ext === '.jpg' || ext === '.jpeg'|| ext === '.gif'){

                    await fs.rename(imageTempPath, targetPath);

                    const userToEdit = ({
                        imgUrl: imgUrl + ext
                    });
                    const userEdited = await User.findByIdAndUpdate(req.body.idUser, userToEdit, {new: true});
                    return res.json(userEdited);

                }else{

                    await fs.unlink(imageTempPath);

                    res.status(500).json({error: 'Solo se permiten imagenes'});
                }

            }

        };

    saveImage();

});

module.exports = router;