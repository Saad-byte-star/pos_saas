const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const cartSchema = new mongoose.Schema({

    customerId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    items : [{
        itemId : {
            type : mongoose.SchemaTypes.ObjectId,
            ref : 'Product',
            required : true
        },
        quantity : { 
            type : mongoose.SchemaTypes.Number,
            default : 1,
        },
        bill : {
            type : mongoose.SchemaTypes.Number,   
        }
    }]
})

const Cart = mongoose.model('Cart', cartSchema);


const customerSchema = new mongoose.Schema({

    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    contactNumber: {
        type: mongoose.SchemaTypes.String,
    },
    billingAddress: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    deliveryAddress: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    paymentDetails: {
        type: String,
        required: true
    },
    cart: {
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref : 'Cart'
    }
});

const Customer = mongoose.model("Customer" , customerSchema)


const adminSchema = new mongoose.Schema({

    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

const Admin = mongoose.model("Admin" , adminSchema)


adminSchema.pre("save", async function (next) {
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password , saltRound);
        user.password  = hashPassword;

    }catch(error){
        console.log(`unable to hash password , returned error : ${error}`);
    }
})


adminSchema.pre("save", async function (next) {
    const admin = this;
    if(!admin.isModified('password')){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(admin.password , saltRound);
        admin.password  = hashPassword;

    }catch(error){
        console.log(`unable to hash password , returned error : ${error}`);
    }
})

// Comparing the hash password
adminSchema.methods.comparePassword = async function (pass) {
    try {
     return await bcrypt.compare(pass, this.password);
    } catch (error) {
      console.log(`failed to compare password ${error}`);
    }
  };
  

  customerSchema.pre("save", async function (next) {
    const customer = this;
    if(!customer.isModified('password')){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(customer.password , saltRound);
        customer.password  = hashPassword;

    }catch(error){
        console.log(`unable to hash password , returned error : ${error}`);
    }
})

// Comparing the hash password
customerSchema.methods.comparePassword = async function (pass) {
    try {
     return await bcrypt.compare(pass, this.password);
    } catch (error) {
      console.log(`failed to compare password ${error}`);
    }
  };


  customerSchema.methods.generateToken = async function () {
    try {
      return jwt.sign(
        {
            customerId: this._id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "20m",
        }
      );
    } catch (error) {
      console.log(`failed to generate token ${error}`);
    }
  };

  adminSchema.methods.generateToken = async function () {
    try {
      return jwt.sign(
        {
            adminId: this._id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "20m",
        }
      );
    } catch (error) {
      console.log(`failed to generate token ${error}`);
    }
  };

module.exports = { Admin , Customer , Cart }
