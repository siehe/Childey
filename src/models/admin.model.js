const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    }
});

const Admin = mongoose.model('Admin', AdminSchema);

exports.Admin = Admin;
exports.AdminSchema = AdminSchema;