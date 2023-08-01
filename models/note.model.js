import  { Schema, model } from "mongoose";

const noteSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    }
},{
    timestamps: true
});

const Note = model('Note', noteSchema);

export default Note;