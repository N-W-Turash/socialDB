var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema       = mongoose.Schema;

var UsersSchema   = new Schema({
    name: String,
    username: String,
    email: String,
    phone:String,
    company_name: String
});

UsersSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UsersSchema);