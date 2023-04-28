import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote,editNote } = context;
  const { note } = props;
  const handleDelete = () => {
    deleteNote(note._id);
  };
  const handleEdit = () => {
    editNote(note._id,note.title,note.note,note.tag)
  };
  return (
    <div className="col-md-4 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title p-1">{note.title}</h5>
          <p className="card-text p-1">{note.note}</p>
          <div className="buttons d-flex justify-content-between mt-3">
            <button
              style={{ background: "none", border: "none" }}
              onClick={handleDelete}
            >
              <i className="fa-solid fa-trash fa-lg"></i>
            </button>
            <button
              style={{ background: "none", border: "none" }}
              onClick={handleEdit}
            >
              {" "}
              <i className="fa-solid fa-pen-to-square fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
