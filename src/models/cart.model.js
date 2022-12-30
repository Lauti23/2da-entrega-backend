const {Schema, model} = require('mongoose')

const schema = new Schema({
    productos: {
        type: Array
    },
}, {
    timestamps: true,
})

module.exports = model('carts', schema)