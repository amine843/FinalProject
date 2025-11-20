const mongoose = require("mongoose");
const { response } = require("express");


const PollSchema = new mongoose.Schema({
    question: {type: String,required: true},
    type: {type: String, required: true},
    options : [
        {
            optionText: { type: String, required: true },
            votes: { type: Number, default: 0 }, // for vote tracking
        },
    ],
    responses:[
        {
            voterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // for open ended polls
            responseText: { type: String },
            createdAt: { type: Date, default: Date.now },
        },
        ],
        creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // to track who voted
        createdAt: { type: Date, default: Date.now },
        closed: { type: Boolean, default: false },
});
module.exports = mongoose.model("Poll", PollSchema);