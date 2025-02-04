import React from "react";
import { useDispatch, useSelector } from "react-redux";

//* actions
import {
  SET_PAGE_TRANSITION_NEW_LOCATION,
  SET_PAGE_TRANSITION_CURRENT_LOCATION,
} from "../../../../store/actions/actions";

export default function usePageTransition() {
  //=y State
  //y *********************************************************
  const newLocation = useSelector(
    (state) => state.ui.pageTransition.newLocation
  );
  const currentLocation = useSelector(
    (state) => state.ui.pageTransition.currentLocation
  );
  const dispatch = useDispatch();

  //=+ Handlers
  //+ *********************************************************
  const handleNavigate = (path) => {
    dispatch(SET_PAGE_TRANSITION_NEW_LOCATION(path));
  };

  //+ *********************************************************
  const handleSetCurentLocation = (path) => {
    dispatch(SET_PAGE_TRANSITION_CURRENT_LOCATION(path));
  };

  return {
    navigate: handleNavigate,
    setCurrentLocation: handleSetCurentLocation,
    currentLocation,
    newLocation,
  };
}
