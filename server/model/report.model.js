const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reportId : {
        type : mongoose.SchemaTypes.ObjectId,
        auto : true
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Customer',
        required : true
    },
    items : [{
        productId : {
            type : mongoose.SchemaTypes.ObjectId,
            ref : 'Product',
            required : true 
        },
        quantity : { 
            type : mongoose.SchemaTypes.Number,
            required : true,
            default : 1
        },
        bill :{
            type : mongoose.SchemaTypes.Number,
            required : true   
        }
    }],
    totalBill : {
        type : mongoose.SchemaTypes.Number,
        required : true
    },
    purchasedOn : {
        type : mongoose.SchemaTypes.Date,
        default : Date.now()
    },
    sentTo : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    isPaid : {
        type : mongoose.SchemaTypes.Boolean,
        default : false
    }
});

const Report = mongoose.model('Report' , reportSchema);

module.exports = { Report };