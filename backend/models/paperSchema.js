const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    pdfname: {
        type: String,
        required: true
    },
    pdfdata: {
        type: Buffer,
        required: true
    },
    isPublished: {
        type: String,
        required: true
    },
    reviewers: [String],
    authors: [String],
    abstract: String,
    comments: [[[String, String]]]
}, { timestamps: true });

module.exports = mongoose.model('papers', paperSchema)