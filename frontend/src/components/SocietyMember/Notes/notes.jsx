import React, { useState, useEffect } from 'react';
import Note from './Note';
import './notes.css';
import { Pencil } from 'lucide-react';

function NoteApp() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    setNotes([...notes, {id: Date.now() ,text: '', html: '' }]);
  };

  const updateNote = (id, newNote) => {
    // const newNotes = notes.slice();
    // newNotes[index] = newNote;
    const newNotes = notes.map((note) => {
      return note.id === id ? { ...note, ...newNote } : note;
    });
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  };

  const userId = localStorage.getItem('skilloptoken');

  return (
    <div className='mt-16'>
        <h2 className='text-sm text-wrap'>These are {userId}'s notes</h2>
      <h2 className='ml-16 text-4xl'>Nottify - A Note Making App</h2>
      <button className="btn_add flex mt-4" onClick={addNote}>
        <Pencil/> Add Note
      </button>
      <div className="notes-container">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={() => deleteNote(note.id)}
            onUpdate={(newNote) => updateNote(note.id, newNote)}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteApp;
