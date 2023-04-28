/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  // const s1={
  //     "name":"Deepak",
  //     "class":"cse 8b"
  // }
  // const [state,setState]=useState(s1)
  // const update=()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name":"Pakdeep",
  //             "class":"cse 8c"
  //         })
  //     }, 1000);
  // }
  const noteInitial = [];
  const [note, setNote] = useState(noteInitial);
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
    const newnote = {
      _id: "643cd848c68411bfb28dfddef",
      user: "643cd7f6c68411bfb28dfde6",
      title: title,
      note: note,
      tag: tag,
      date: "2023-04-17T05:22:55.609Z",
      __v: 0,
    };
    setNote((note) => [...note, newnote]);
  };

  // delete a note
  const deleteNote = async (id) => {
    setNote((note) => note.filter((note) => note._id !== id));
    const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzY2Q3ZjZjNjg0MTFiZmIyOGRmZGU2In0sImlhdCI6MTY4MTc5OTMwM30.WgfwcZg2spc37TRnx_Pr2Ua0zzQkjqpTshvrHznyqSI",
      },
    });
    const json = await response.json();
    console.log(json)
  };
  // edit a note
  const editNote = async (id, title, getnote, tag) => {    
    const response = await fetch(`${host}/api/note/updateNote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzY2Q3ZjZjNjg0MTFiZmIyOGRmZGU2In0sImlhdCI6MTY4MTc5OTMwM30.WgfwcZg2spc37TRnx_Pr2Ua0zzQkjqpTshvrHznyqSI",
      },
      body: JSON.stringify({ title, getnote, tag }),
    });
    // const json=response.json();
    for (let index = 0; index < note.length; index++) {
      const element = note[index];
      if (element._id === id) {
        note[index].title = title;
        note[index].note = getnote;
        note[index].tag = tag;
      }
    }
  };
  return (
    // <NoteContext.Provider value={{state,update}}>
    <NoteContext.Provider
      value={{ note, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
