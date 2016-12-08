var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema       = mongoose.Schema;

var PostsSchema   = new Schema({
    user_id: Number,
    title: String,
    body: String
},{
    timestamps: true
});

PostsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostsSchema);