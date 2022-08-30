const { model, Schema } = require('mongoose');

const FurnitureSchema = Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = model('furniture', FurnitureSchema, 'furniture');