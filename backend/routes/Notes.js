const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
// fetching all saved notes
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send({ error: "some internal error occured" });
  }
});
// adding a new note
router.post(
  "/addNotes",
  fetchuser,
  [
    body("title", "Please enter a valid title").isLength({
      min: 2,
    }),
    body("note", "Note must be of length atleast 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, note, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newNote = new Notes({
        user: req.user.id,
        title: title,
        note: note,
        tag: tag,
      });
      const savedNote = await newNote.save();

      res.json(savedNote);
    } catch (error) {
      res.status(500).send({ error: "some internal error occured" });
    }
  }
);
// updating a existing note
router.put("/updateNote/:id", fetchuser, async (req, res) => {
  const { title, note, tag } = req.body;
  try {
    // crete a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (note) {
      newNote.note = note;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find note to be updated
    let searchedNote = await Notes.findById(req.params.id);
    if (!searchedNote) {
      return res.status(401).send({
        error: "Note Not found",
      });
    }
    if (searchedNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    } else {
      searchedNote = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note: searchedNote });
    }
  } catch (error) {
    res.status(500).send({ error: "some internal error occured" });
  }
});
// deleting the existing note
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    let searchedNote = await Notes.findById(req.params.id);
    if (!searchedNote) {
      return res.status(401).send({
        error: "Note Not found",
      });
    }
    if (searchedNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    } else {
      searchedNote = await Notes.findByIdAndDelete(req.params.id);
      res.json({
        success: "The note is successfully deleted",
        note: searchedNote,
      });
    }
  } catch (error) {
    res.status(500).send({ error: "some internal error occured" });
  }
});

module.exports = router;
