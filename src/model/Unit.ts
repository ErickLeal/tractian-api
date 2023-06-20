import mongoose from 'mongoose';

const Unit = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }, 
    company:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    }  
});

export default mongoose.model("Unit", Unit)