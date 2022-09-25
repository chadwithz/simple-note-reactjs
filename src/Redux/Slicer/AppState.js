import { createSlice } from "@reduxjs/toolkit";

const appStateSlice = createSlice({
  name: "appState",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = appStateSlice.actions;
export default appStateSlice.reducer;
