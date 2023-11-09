import { configureStore } from "@reduxjs/toolkit";
import dndReducer from "./dndReducer";
import spriteReducer from "./spriteReducer";

const store = configureStore({
  reducer: {
    dnd: dndReducer,
    sprite: spriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
