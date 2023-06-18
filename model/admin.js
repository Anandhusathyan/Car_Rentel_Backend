const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // for hashing password

const AdminSchema =new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: [true, 'you have to register email']
        
    },
    password: {
        type: String,
        required: [true, 'you have to register password']
    },
    contact:{
        type:Number
    }
    
}
);

AdminSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  AdminSchema.statics.login = async function(email, password) {
    const admin = await this.findOne({ email });
    // console.log(user)
    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      // console.log(auth)
      if (auth) {
        return admin;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
};



const Admin = mongoose.model('Admin', AdminSchema);

module.exports =  Admin;
