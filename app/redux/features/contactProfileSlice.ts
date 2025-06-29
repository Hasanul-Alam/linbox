import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  tags: [],
  notes: [],
};

const contactProfileSlice = createSlice({
  name: "chatProfile",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      const { groupsData } = action.payload;
      state.groups = groupsData;
    },
  },
});

export const { setGroups } = contactProfileSlice.actions;

export default contactProfileSlice.reducer;
