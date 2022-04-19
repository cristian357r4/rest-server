 const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true,'El rol es necesario'],
        unique: true
    }

});

module.exports = model('Role', RoleSchema);