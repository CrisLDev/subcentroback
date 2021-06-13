const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    non_communicable_diseases: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    sexually_transmitted_diseases: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    degenerative_diseases: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    others: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    blood_type: {
      type: String,
      required: true,
    },
    adictions: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    allergies: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    antibiotics: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    has_been_hospitalized: {
      type: String,
    },
    respiratory: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    cardiovascular: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    genitourinary: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    endocrine: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    nervous: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    muscular: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
      },
    ],
    conclusions: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = History = mongoose.model("history", HistorySchema);
