import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const note = new Schema({
    content: { type: String, required: true },
    bug: { type: ObjectId, ref: 'Bug', required: true },
    reportedBy: { type: String, required: true }, //The provided name for who made the note
    flagged: { type: String, enum: ["pending", "completed", "rejected"], default: "pending" }
}, { timestamps: true, toJSON: { virtuals: true } });

export default note;