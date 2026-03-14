import Note from '../models/Note.js';


export async function getAllNotes(req, res) {
  try {
    // const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 }); // fetch all notes from db, sorted by createdAt in descending order
      
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getALlNotes Controller: ", error)
    res.status(500).json({ message: "Internal server error" } );
  }
}

export async function getNoteById(req, res) {
  try {
    const fetchedNote = await Note.findOne({ _id: req.params.id, userId: req.user.id });

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
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // [AUTH-EDIT-3] store owner id on create
    const note = new Note({
      userId: req.user.id,
      title,
      content
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote Controller: ", error)
    res.status(500).json({ message: "Internal server error" } );
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // [AUTH-EDIT-4] update only if owned by current user
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote Controller: ", error)
    res.status(500).json({ message: "Internal server error" } );
  }
}   


export async function deleteNote(req, res) {
  try {
    // const deletedNote = await Note.findByIdAndDelete(req.params.id);
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if(!deletedNote){
      return res.status(404).json({message: "Note not found"});
    }

    res.status(200).json({message: "Note deleted successfully"});
  } catch (error) {
    console.error("Error in deleteNote Controller: ", error)
    res.status(500).json({ message: "Internal server error" } );
  }
}       
