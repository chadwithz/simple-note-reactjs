import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState, createBasicReducer } from "../../helper";
import { db } from "../../Firebase";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
const notesCol = collection(db, "notes");

const types = {
  GET_NOTES: "getNotes",
  GET_NOTE_BY_ID: "getNoteById",
  CREATE_NOTE: "createNote",
  UPDATE_NOTE: "updateNote",
  DELETE_NOTE: "deleteNote",
};

// get all notes
export const getNotes = createAsyncThunk(
  types.GET_NOTES,
  async (_data = null, thunkAPI) => {
    try {
      const notesSnapshot = await getDocs(notesCol);
      const notesList = notesSnapshot.docs.map((doc) => doc.data());
      return notesList;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

// get note by id
export const getNoteById = createAsyncThunk(
  types.GET_NOTE_BY_ID,
  async (data, thunkAPI) => {
    try {
      const docRef = doc(db, "notes", data.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

// create note
export const createNote = createAsyncThunk(
  types.CREATE_NOTE,
  async (data, thunkAPI) => {
    try {
      await addDoc(notesCol, data);
      return;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

// update note
export const updateNote = createAsyncThunk(
  types.UPDATE_NOTE,
  async (data, thunkAPI) => {
    try {
      const docRef = doc(db, "notes", data.id);
      await updateDoc(docRef, data);
      return;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

// delete note
export const deleteNote = createAsyncThunk(
  types.DELETE_NOTE,
  async (data, thunkAPI) => {
    try {
      await deleteDoc(doc(db, "notes", data.id));
      return;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

// slicer
export const noteSlice = createSlice({
  name: "notes",
  initialState: { ...initialState },
  reducers: {
    clearError: (state) => {
      state.error = {
        state: false,
        message: null,
      };
    },
    clearSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // get all notes
    builder.addCase(getNotes.pending, (state, action) => {
      createBasicReducer(state, action, "PENDING");
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      createBasicReducer(state, action, "FULFILLED");
    });
    builder.addCase(getNotes.rejected, (state, action) => {
      createBasicReducer(state, action, "REJECTED");
    });
    // get 1
    builder.addCase(getNoteById.pending, (state, action) => {
      createBasicReducer(state, action, "PENDING");
    });
    builder.addCase(getNoteById.fulfilled, (state, action) => {
      createBasicReducer(state, action, "FULFILLED");
    });
    builder.addCase(getNoteById.rejected, (state, action) => {
      createBasicReducer(state, action, "REJECTED");
    });
    // create product
    builder.addCase(createNote.pending, (state, action) => {
      createBasicReducer(state, action, "PENDING");
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      createBasicReducer(state, action, "FULFILLED");
    });
    builder.addCase(createNote.rejected, (state, action) => {
      createBasicReducer(state, action, "REJECTED");
    });
    // update product
    builder.addCase(updateNote.pending, (state, action) => {
      createBasicReducer(state, action, "PENDING");
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      createBasicReducer(state, action, "FULFILLED");
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      createBasicReducer(state, action, "REJECTED");
    });
    // delete product
    builder.addCase(deleteNote.pending, (state, action) => {
      createBasicReducer(state, action, "PENDING");
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      createBasicReducer(state, action, "FULFILLED");
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      createBasicReducer(state, action, "REJECTED");
    });
  },
});

export const { clearError, clearSuccess } = noteSlice.actions;
export default noteSlice.reducer;
