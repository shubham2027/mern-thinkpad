import Note from '../models/Note.js';


export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1}); // fetch all notes from db, sorted by createdAt in descending order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getALlNotes Controller: ", error)
    res.status(500).json({ message: "Internal server error" } );
  }
}

export async function getNoteById(req, res) {
  try {
    const fetchedNote = await Note.findById(req.params.id);

    if(!fetchedNote){
      return res.status(404).json({message: "Note not found"});
    }

    res.status(200).json(fetchedNote);
  } catch (error) {
    console.error("Error in getNoteById Controller: ", error)
    res.status(500).json({ message: "Internal server error" } );
  }
}

export async function createNote(req, res) {
  try {
    const {title, content} = req.body;
    const note = new Note({title: title, content: content}); //calling the model constructor

    const savedNote = await note.save(); // saving to db

    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote Controller: ", error)
    res.status(500).json({ message: "Internal server error" } );
  }
}

export async function updateNote(req, res) {
  try {
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

    if(!updatedNote){
      return res.status(404).json({message: "Note not found"});
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote Controller: ", error)
    res.status(500).json({ message: "Internal server error" } );
  }
}   


export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote){
      return res.status(404).json({message: "Note not found"});
    }

    res.status(200).json({message: "Note deleted successfully"});
  } catch (error) {
    console.error("Error in deleteNote Controller: ", error)
    res.status(500).json({ message: "Internal server error" } );
  }
}       
