import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";

export default function Note() {
  const context = useContext(noteContext);
  const { notess, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [notes, setNotes] = useState({
    id: "",
    etitle: "",
    enote: "",
    etag: "default",
  });
  const updateNote = (currentNote) => {
    ref.current.click();     
    setNotes({
      id: currentNote._id,
      etitle: currentNote.title,
      enote: currentNote.note,
      etag: currentNote.tag,
    });
  };
  const handleChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    editNote(notes.id, notes.etitle, notes.enote, notes.etag);
    refClose.current.click();
  };
  return (
    <div className="container">
      <Addnote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Your Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-floating w-80 m-auto my-3 ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control w-100"
                    id="etitle"
                    placeholder="xx"
                    name="etitle"
                    onChange={handleChange}
                    value={notes.etitle}
                  />
                  <label htmlFor="etitle">Note Title</label>
                </div>
                <div className="form-floating w-80 m-auto mb-3">
                  <textarea
                    className="form-control w-100"
                    id="enote"
                    name="enote"
                    placeholder="xx"
                    onChange={handleChange}
                    value={notes.enote}
                    style={{
                      height: "80px",
                    }}
                  />
                  <label htmlFor="enote">Note Description</label>
                </div>
                <div className="form-floating w-80 m-auto mb-3">
                  <input
                    type="text"
                    className="form-control w-100"
                    id="etag"
                    name="etag"
                    placeholder="xx"
                    onChange={handleChange}
                    value={notes.etag}
                  />
                  <label htmlFor="etag">Tag</label>
                </div>
                <div className="d-flex justify-content-center"></div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h1 className="text-warning text-center">Your Notes</h1>
        {notess.map((noteItem) => (
          <NoteItem key={noteItem._id} noteItem={noteItem} updateNote={updateNote} />
        ))}
      </div>
    </div>
  );
}
