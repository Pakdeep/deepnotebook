import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", note: "", tag: "default" });
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.note, note.tag);
  };
  return (
    <>
      <h1 className="text-warning text-center">Add a note</h1>
      <form>
        <div className="form-floating w-50 m-auto my-3 ">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label"
          ></label>
          <input
            type="text"
            className="form-control w-100"
            id="title"
            placeholder="xx"
            name="title"
            style={{
              width: "60%",
            }}
            onChange={handleChange}
          />
          <label htmlFor="title">Note Title</label>
        </div>
        <div className="form-floating w-50 m-auto mb-3">
          <textarea
            className="form-control w-100"
            id="note"
            name="note"
            placeholder="xx"
            style={{
              height: "100px",
              width: "60%",
            }}
            onChange={handleChange}
          />
          <label htmlFor="note">Note Description</label>
        </div>
        <div className="form-floating w-50 m-auto mb-3">
          <input
            type="text"
            className="form-control w-100"
            id="tag"
            name="tag"
            placeholder="xx"
            onChange={handleChange}
          />
          <label htmlFor="tag">Tag</label>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleClick}
          >
            Add Note
          </button>
        </div>
      </form>
    </>
  );
};

export default Addnote;
