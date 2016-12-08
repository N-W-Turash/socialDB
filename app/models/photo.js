var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema       = mongoose.Schema;

var PhotosSchema   = new Schema({
    title: String,
    imageUrl: String
});

PhotosSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Photo', PhotosSchema);