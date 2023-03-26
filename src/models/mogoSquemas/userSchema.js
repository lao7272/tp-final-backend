import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    username: {type: String, require: true, max: 100},
    age: {type: Number, require: true},
    tel: {type: String, require: true},
    address: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    avatar: {type: String, require: true},
});

export default UsersSchema;