// const mongoose= require ("mongoose"); 

// const postSchema = new mongoose.Schema({

// name: {
//     type : String,
// },

// caption:{
//  type: String,
// },

// likes:{
//     type: Boolean,
// },

// });

// const post = mongoose.model("post", postSchema );

// module.exports = post;

// const mongoose = require ("mongoose");


// const mongoose = require('mongoose'); 

// const postSchema = new mongoose.Schema({

//     title: {
//         type: String,
//         required: true,
//         trim: true,

//     },

//     content: {
//         type: String,
//         required: true,
//     },

//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',
//     },

//     likes: {
//         type: Number,
//         default: 0,

//     },

//     isPublished: {
//         type: Boolean,
//         default: false,

//     },
// });

// // const post= mongoose.model("post", postSchema);
// module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose'); //  Require MongoDB!

const postSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        tags: {
            type: [String],
            default: []
        },

        likes: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        
    image:{
    type: String,
   },

    },

    {
        timestamps: true
    }
    
);

module.exports = mongoose.model('Post', postSchema);
