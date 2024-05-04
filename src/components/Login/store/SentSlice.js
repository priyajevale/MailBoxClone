import { createSlice } from "@reduxjs/toolkit";

export const sentSlice = createSlice({
  name: "sent",
  initialState: {
    emails: [],
  },
  reducers: {
    fetchSentEmailsSuccess: (state, action) => {
      state.emails = action.payload;
    },
    deleteSentEmail: (state, action) => {
      state.emails = state.emails.filter(
        (email) => email.id !== action.payload
      );
    },

  },
});

export const { fetchSentEmailsSuccess, deleteSentEmail } = sentSlice.actions;

export default sentSlice.reducer;