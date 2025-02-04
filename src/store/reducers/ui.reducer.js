import { createSlice } from "@reduxjs/toolkit";

// Utils
import mediaQueryUtils from "../../utils/mediaQueryUtils";

// initialState
const initialState = {
  theme: {},
  mq: {},
  componentStatus: {},
  introCompleted: false,
  pageTransition: {
    currentLocation: null,
    newLocation: null,
  },
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    SET_PAGE_TRANSITION_NEW_LOCATION: (ui, { payload }) => {
      ui.pageTransition.newLocation = payload;
    },

    SET_PAGE_TRANSITION_CURRENT_LOCATION: (ui, { payload }) => {
      ui.pageTransition.currentLocation = payload;
    },

    SET_COMPLETE_INTRO: (ui) => {
      ui.introCompleted = true;
    },

    SET_THEME: (ui, { payload }) => {
      ui.theme = payload;
      ui.mq = mediaQueryUtils.all();
      ui.componentStatus = mediaQueryUtils.componentStatusAfterResizing();
    },

    RESIZING: (ui, { payload }) => {
      ui.mq = mediaQueryUtils.all();
      ui.componentStatus = mediaQueryUtils.componentStatusAfterResizing();
    },
  },
});

export default slice.reducer;

export const { actions } = slice;
