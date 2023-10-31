const {Schema, model} = require('mongoose');
 

const ArticleSchema = Schema({

    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true

    },
    date:{
        type: Date,
        default: Date.now

    },
    image:{
        type: String,
        default: "https://res.cloudinary.com/dllbgwjij/image/upload/c_crop,g_auto,h_500,w_500/v1698674430/BLOG/default/dubzxmuuiszutvuzk1ni.jpg"

    }
});

module.exports = model("Article",ArticleSchema);
