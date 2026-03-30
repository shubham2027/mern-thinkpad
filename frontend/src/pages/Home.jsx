import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimit from '../components/RateLimit';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const Home = () => {
  const [isRatelimited, setIsRatelimited] = useState(true);    
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [pinFilter, setPinFilter] = useState("all");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(()=>{
    const fetchNotes = async ()=>{
      setLoading(true);
      try {
        const res = await api.get('/notes', {
          params: {
            q: debouncedSearchTerm,
            pinned: pinFilter,
          },
        });
        setNotes(res.data);
        setIsRatelimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);
        if(error.response?.status === 429){
          setIsRatelimited(true);
        }else{
          toast.error("Error fetching notes");
          setIsRatelimited(false);
        }
          
      }finally{
        setLoading(false);
      }
    }
    fetchNotes();
  },[debouncedSearchTerm, pinFilter])

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 -z-0'>
        <div className='absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/25 blur-3xl' />
        <div className='absolute top-1/3 right-10 h-80 w-80 rounded-full bg-green-300/20 blur-3xl' />
        <div className='absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl' />
      </div>

      <Navbar />

      {isRatelimited && <RateLimit /> }



      <div className='relative z-10 mx-auto mt-6 max-w-7xl p-4'>
        <div className='rounded-3xl border border-white/15 bg-base-100/35 p-5 shadow-[0_8px_50px_rgba(16,185,129,0.15)] backdrop-blur-xl md:p-6'>
          <div className='mb-6 grid grid-cols-1 gap-3 md:grid-cols-3'>
            <label className='input input-bordered flex items-center gap-2 md:col-span-2'>
              <input
                type='text'
                className='grow'
                placeholder='Search notes by title or content...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>

            <select
              className='select select-bordered w-full'
              value={pinFilter}
              onChange={(e) => setPinFilter(e.target.value)}
            >
              <option value='all'>All notes</option>
              <option value='true'>Pinned only</option>
              <option value='false'>Unpinned only</option>
            </select>
          </div>

          {loading && <div className='py-10 text-center text-primary'> Loading notes... </div>}

          {!loading && notes.length === 0 && !isRatelimited && <NotesNotFound/>}

          {notes.length > 0  && !isRatelimited &&(
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {notes.map(note=>(
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>

              ))}
            </div>
          )}
          </div>
      </div>
    </div>
  )
}

export default Home
