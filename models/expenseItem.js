const mongoose = require('mongoose');
const categories = require('./category');
const modes = require('./mode');
mongoose.connect('mongodb://127.0.0.1:27017/expTrackDB');
const Schema = mongoose.Schema;

const ExpenseItemSchema = new Schema ({
    name: String,
    price: Number,
    category : {
        type: String,
        enum: categories,
    },
    date: Date,
    shop: String,
    bill: { 
        data: Buffer, 
        contentType: String 
    },
    mode: {
        type: String,
        enum: modes
    },
    details: String
})

const ExpenseItem = mongoose.model('ExpenseItem', ExpenseItemSchema);

module.exports = ExpenseItem;