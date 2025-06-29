import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: {
    allGroups: [],
    contactGroups: [],
  },
  tags: [],
  notes: [],
};

const contactProfileSlice = createSlice({
  name: "chatProfile",
  initialState,
  reducers: {
    // -------------------------
    // Groups Reducers
    // -------------------------
    setAllGroups: (state, action) => {
      const { groupsData } = action.payload;
      console.log("groupsData: ", groupsData);
      state.groups.allGroups = groupsData;
    },
    setContactGroups: (state, action) => {
      const { groupsData } = action.payload;
      state.groups.contactGroups = groupsData;
    },

    deleteGroup: (state, action) => {
      const { groupId } = action.payload;
      state.groups.contactGroups = state.groups.contactGroups.filter(
        (group) => group.id !== groupId
      );
    },

    // -------------------------
    // Tags Reducers
    // -------------------------
  },
});

export const { setAllGroups, setContactGroups, deleteGroup } =
  contactProfileSlice.actions;

export default contactProfileSlice.reducer;
