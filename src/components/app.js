import React from "react";
import dva from "dva";
import { loadState, saveState } from "../models/localStorage";

// dva hook method triggers when app state changes
const onStateChange = info => {
  saveState(info);
};

// Create dva app
export const app = dva({
  initialState: loadState(),
  onStateChange: onStateChange
});