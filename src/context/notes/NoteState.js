/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notess, setNote] = useState(noteInitial);
  // add a note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzY2Q3ZjZjNjg0MTFiZmIyOGRmZGU2In0sImlhdCI6MTY4MTc5OTMwM30.WgfwcZg2spc37TRnx_Pr2Ua0zzQkjqpTshvrHznyqSI",
      },
    });
    const json = await response.json();
    setNote(json);
  };
  // add a note
  const addNote = async (title, note, tag) => {
    const response = await fetch(`${host}/api/note/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzY2Q3ZjZjNjg0MTFiZmIyOGRmZGU2In0sImlhdCI6MTY4MTc5OTMwM30.WgfwcZg2spc37TRnx_Pr2Ua0zzQkjqpTshvrHznyqSI",
      },
      body: JSON.stringify({ title, note, tag }),
    });
    let newnote = await response.json();
    setNote((notess) => [...notess, newnote]);
  };

  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzY2Q3ZjZjNjg0MTFiZmIyOGRmZGU2In0sImlhdCI6MTY4MTc5OTMwM30.WgfwcZg2spc37TRnx_Pr2Ua0zzQkjqpTshvrHznyqSI",
      },
    });
    const json = await response.json();
    const newNotes = notess.filter((noteitem) => {
      return noteitem._id !== id;
    });
    setNote(newNotes);
  };
  // edit a note
  const editNote = async (id, title, desc, tag) => {
    const response = await fetch(`${host}/api/note/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzY2Q3ZjZjNjg0MTFiZmIyOGRmZGU2In0sImlhdCI6MTY4MTc5OTMwM30.WgfwcZg2spc37TRnx_Pr2Ua0zzQkjqpTshvrHznyqSI",
      },
      body: JSON.stringify({ title, desc, tag }),
    });
    let newNotes = JSON.parse(JSON.stringify(notess));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;   
        newNotes[index].note = desc;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(newNotes)
    setNote(newNotes);
    console.log(notess)
  };
  return (
    // <NoteContext.Provider value={{state,update}}>
    <NoteContext.Provider
      value={{ notess, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
