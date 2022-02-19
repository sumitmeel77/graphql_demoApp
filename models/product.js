const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// product schema
const productSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    sellerID: {
        type: String
    }
});

module.exports = mongoose.model('Product', productSchema);