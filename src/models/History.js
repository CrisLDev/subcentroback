const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    observations: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
    breathe: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
    diagnostic: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
    symptom: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
    temperature: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
    pulse: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
    presure: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
    weight: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        data: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = History = mongoose.model("history", HistorySchema);
