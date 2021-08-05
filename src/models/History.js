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
        date: {
          type: Date,
          default: Date.now()
        }
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
        date: {
          type: Date,
          default: Date.now()
        }
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
        date: {
          type: Date,
          default: Date.now()
        }
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
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
    blood_type: {
      type: String
    },
    adictions: [
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
    allergies: [
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
    antibiotics: [
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
        date: {
          type: Date,
          default: Date.now()
        }
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
        date: {
          type: Date,
          default: Date.now()
        }
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
        date: {
          type: Date,
          default: Date.now()
        }
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
        date: {
          type: Date,
          default: Date.now()
        }
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
        date: {
          type: Date,
          default: Date.now()
        }
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
        date: {
          type: Date,
          default: Date.now()
        }
      },
    ],
    conclusions: {
      type: String,
    },
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
    hereditary: [
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
    disabilities: [
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
    frequency: [
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
  },
  { timestamps: true, versionKey: false }
);

module.exports = History = mongoose.model("history", HistorySchema);
