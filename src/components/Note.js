import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";

export default function Note() {
  const context = useContext(noteContext);
  const { note,getNotes } = context;
  useEffect(()=>{
    getNotes()
    // eslint-disable-next-line
  },[])
  return (
    <div className="container">
      <Addnote />
      <div className="row my-4">
        <h1 className="text-warning text-center">Your Notes</h1>
        {note.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}
