import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true }, 
    /*
    salary: { type: Number },  // make this attribute Nullable
    role: {
        type: String,
        required: true,
        enum: ['manager', 'base-agent'] // enforce these options
    }
        */
});

const User = mongoose.model('User', userSchema);

export default User;