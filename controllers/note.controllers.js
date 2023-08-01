import Note from "../models/note.model.js";
import AppError from "../utils/error.util.js";
import User from "../models/user.model.js";

// Create a new note
const createNote = async (req, res, next) => {
  try {
    const { title, description, tag } = req.body;
    const userId = req.user.id;

    // Create a new note with the provided data and assign it to the current user
    const newNote = await Note({
      title,
      description,
      tag: tag || "General",
      user: userId,
    });

    // Save the new note to the database
    const savedNote = await newNote.save();

    // Add the note's ID to the user's notes array
    await User.findByIdAndUpdate(userId, {
      $push: { notes: savedNote._id },
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      savedNote,
    });
  } catch (error) {
    // Handle any errors that occurred during the note creation process
    return next(new AppError(500, "Failed to create note" || error.message));
  }
};

// Controller function to fetch all notes for a user
const allNotes = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find all notes associated with the current user
    const notes = await Note.find({ user: userId });
    res.status(200).json({
      success: true,
      message: "Successfully fetched all notes for the user",
      notes,
    });
  } catch (error) {
    // Handle any errors that occurred during the note fetching process
    return next(new AppError(500, "Failed to fetch notes" || error.message));
  }
};

// Controller function to update an existing note
const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, tag } = req.body;

    // Find the note by ID
    const note = await Note.findById(id);

    if (!note) {
      // If the note is not found, return an error
      return next(new AppError(400, "Note not found"));
    }

    if (note.user.toString() !== req.user.id) {
      // If the note does not belong to the current user, return an error
      return next(new AppError(401, "Unauthorized access"));
    }

    // Update the note with the provided data
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description, tag: tag || "General" },
      { new: true }
    );

    if (!updatedNote) {
      // If the update was not successful, return an error
      return next(new AppError(400, "Failed to update note"));
    }

    // Save the updated note to the database
    await updatedNote.save();

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    // Handle any errors that occurred during the note update process
    return next(new AppError(500, "Failed to update note" || error.message));
  }
};

// Controller function to delete a note
const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the note by ID
    const note = await Note.findById(id);

    if (!note) {
      // If the note is not found, return an error
      return next(new AppError(400, "Note not found"));
    }

    if (note.user.toString() !== req.user.id) {
      // If the note does not belong to the current user, return an error
      return next(new AppError(400, "Unauthorized access"));
    }

    // Delete the note from the database
    const deletedNote = await Note.findByIdAndDelete(id);

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    // Handle any errors that occurred during the note deletion process
    return next(new AppError(500, "Failed to delete note" || error.message));
  }
};

// Export the controller functions
export { createNote, allNotes, updateNote, deleteNote };
