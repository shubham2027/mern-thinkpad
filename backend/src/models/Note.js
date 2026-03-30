import mongoose from 'mongoose';

// 1. create a schema 
// 2. model based on schema

const noteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        title:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        },
        pinned: {
            type: Boolean,
            default: false
        },

    }, {timestamps: true} // automatically adds createdAt and updatedAt fields 
);


const Note = mongoose.model("Note", noteSchema);

export default Note;