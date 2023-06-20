import mongoose from 'mongoose';

const Company = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    cnpj:{
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },      
})

export default mongoose.model("Company", Company)