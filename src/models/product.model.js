const {Schema, model} = require('mongoose')
const schema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        max: 200
    },
    code: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = model('products', schema)