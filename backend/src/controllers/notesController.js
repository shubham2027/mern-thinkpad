import Note from '../models/Note.js';

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


export async function getAllNotes(req, res) {
  try {
    const { q = "", pinned = "all" } = req.query;
    const filter = { userId: req.user.id };

    if (pinned === "true") {
      filter.pinned = true;
    } else if (pinned === "false") {
      // Include legacy notes where `pinned` may not exist yet.
      filter.pinned = { $ne: true };
    }

    if (q.trim()) {
      const escapedSearch = escapeRegex(q.trim());
      filter.$or = [
        { title: { $regex: escapedSearch, $options: "i" } },
        { content: { $regex: escapedSearch, $options: "i" } }
      ];
    }

    // Keep pinned notes at top, newest first inside each group.
    const notes = await Note.find(filter).sort({ pinned: -1, createdAt: -1 });

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

export async function togglePin(req, res) {
  try {
    const existingNote = await Note.findOne({ _id: req.params.id, userId: req.user.id });

    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    existingNote.pinned = !existingNote.pinned;
    const updatedNote = await existingNote.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in togglePin Controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
