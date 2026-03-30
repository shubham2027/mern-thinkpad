import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon, PinIcon } from 'lucide-react';
import { Trash2Icon } from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {
    const sortPinnedFirst = (noteList) => {
        return [...noteList].sort((a, b) => {
            if (a.pinned === b.pinned) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return a.pinned ? -1 : 1;
        });
    };

    const handleDelete = async (e, noteId)=>{
        e.preventDefault();// get rid of the navigaition behavior
        
        if(!window.confirm("Are you sure you want to delete this note?")){
            return;
        }
        try {
            await api.delete(`/notes/${noteId}`);
            setNotes(prevNotes=> prevNotes.filter(n=> n._id !== noteId)); // update state to remove deleted note
            toast.success("Note deleted successfully");
            // navigate(0); // refresh the page
            // window.location.reload();

        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Failed to delete note");
        }

    }

    const handleTogglePin = async (e, noteId) => {
        e.preventDefault();

        try {
            const res = await api.patch(`/notes/${noteId}/pin`);
            const updatedNote = res.data;

            setNotes((prevNotes) => {
                const nextNotes = prevNotes.map((n) => n._id === noteId ? updatedNote : n);
                return sortPinnedFirst(nextNotes);
            });
            toast.success(updatedNote.pinned ? "Note pinned" : "Note unpinned");
        } catch (error) {
            console.error("Error pinning note:", error);
            toast.error("Failed to update pin");
        }
    };

  return (
    <Link to={`/note/${note._id}`}
        className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] bg-base-100/80 backdrop-blur-md shadow-lg'
    >
        <div className='card-body '>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>

            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>
                   {note.createdAt.split('T')[0]} 
                </span>
                <div className='flex flex-center '>
                    <button className={`btn btn-ghost btn-xs ${note.pinned ? 'text-warning' : ''}`} onClick={(e) => handleTogglePin(e, note._id)}>
                        <PinIcon className='size-5'/>
                    </button>
                    <button className='btn btn-ghost btn-xs'>
                        <PenSquareIcon className='size-5'/>
                    </button>
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handleDelete(e,note._id)}>
                        <Trash2Icon className='size-5' />
                    </button>
                </div>
            </div>
        </div>

    </Link>
  )
}

export default NoteCard
