const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  unique: true,
  required: true,
 },
 email: {
  type: String,
  trim: true,
  unique: true,
  required: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 }
});
// hash user password before saving into database
UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
module.exports = mongoose.model('User', UserSchema);
