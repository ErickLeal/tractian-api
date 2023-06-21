import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

const User = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    cpf:{
        type: String,
        required: true,
        unique: true
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
})

User.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

export default mongoose.model("User", User)