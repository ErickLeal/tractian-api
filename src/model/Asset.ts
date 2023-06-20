import mongoose from 'mongoose';

const Asset = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    model:{
        type: String,
        required: true,
    },
    owner:{
        type: String,
        required: true,
    },
    status :{
        type: String,
        required: true,
        validate: {
            validator: function (value: String) {
              return value == "Running" || value == "Alerting" || value == "Stopped";
            },
            message: 'Not supported, please use only - Running, Alerting, Stopped',
        }
    },
    healthLevel :{
        type: Number,
        required: true,
        validate: {
            validator: function (value: number) {
              return value <= 100 && value >= 0;
            },
            message: 'Must be between 0 and 100',
        }
    },
    unit:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Unit'
    }        
})



export default mongoose.model("Asset", Asset)