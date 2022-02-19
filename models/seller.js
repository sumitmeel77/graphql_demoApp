const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//seller schema
const sellerSchema = new Schema({
    sellerName: {
        type: String
    }
});

module.exports = mongoose.model('Seller', sellerSchema);