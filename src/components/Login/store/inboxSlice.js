import { createSlice } from "@reduxjs/toolkit";

export const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    emails: [],
    unreadCount: 0,
  },
  reducers: {
    fetchEmailsSuccess: (state, action) => {
      state.emails = action.payload;
      state.unreadCount = action.payload.filter((email) => !email.read).length;
    },
    markAsRead: (state, action) => {
      state.emails = state.emails.map((email) =>
        email.id === action.payload ? { ...email, read: true } : email
      );
      state.unreadCount -= 1;
    },
    deleteEmail: (state, action) => {
      state.emails = state.emails.filter(
        (email) => email.id !== action.payload
      );
    },
  },
});

export const inboxActions = inboxSlice.actions;

export default inboxSlice.reducer;