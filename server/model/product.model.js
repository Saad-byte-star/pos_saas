const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    id : {
        type : mongoose.SchemaTypes.Number,
        required : true
    },
    name : {
        type : mongoose.SchemaTypes.String,
        required : true
    }
})

const Category = mongoose.model('Category' , categorySchema);


const productSchema = new mongoose.Schema({

    name : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    description : {
        type : mongoose.SchemaTypes.String
    },
    price : {
        type : mongoose.SchemaTypes.Number,
        required : true
    },
    stock : {
        type : mongoose.SchemaTypes.Number,
        required : true,
        default : 1
    },
    imageURLs : [
        { type : mongoose.SchemaTypes.String }
    ],
    categoryId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Category',
        required : true
    },
    listedOn : {
        type : mongoose.SchemaTypes.Date,
        default : Date.now()
    },
    updatedOn : {
        type : mongoose.SchemaTypes.Date,
        default : Date.now()
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product , Category };