const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,   //trims extra blank spaces in the name
    },

    lastname: {
        type: String,
        maxlength: 32,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,  // if duplication, we get informed by mongodb
    },

    userinfo: {
        type: String,
        trim: true,
    },

    encry_password: {
        type: String,
        required: true,
    },

    salt: String,
    
    role: {
        type: Number,
        default: 0,
    },
    
    purchases: {
        type: Array,
        default: [],
    }
  });


userSchema.virtual("password")
  .set(function(password) {
      this._password = password;  //_password is a private variable
      this.salt = uuidv1();
      this.encry_password = this.securePassword(password);
  })
  .get(function() {
      return this._password;
  })


userSchema.method = {

    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },


    securePassword: function (plainpassword){
        if(!password) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update('plainpassword')
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);  // We can refer userSchema with User. This line basically exports this model out of this file. Outside scope is allowed.