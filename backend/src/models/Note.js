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
            default: ""
        },
         drawingData: { 
            type: String, default: null 
        }, // Store tldraw snapshot as JSON string
        noteType: { 
            type: String, enum: ["text", "drawing"], 
            default: "text" 
        }, // Differentiate note types
        pinned: {
            type: Boolean,
            default: false
        },

    }, {timestamps: true} // automatically adds createdAt and updatedAt fields 
);


const Note = mongoose.model("Note", noteSchema);

export default Note;