import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./reducers/countReducer";
import passwordReducer from "./reducers/passwordReducer";

const store = configureStore({
  reducer: {
    counter: CounterReducer,
    password: passwordReducer,
  },
});

export default store;
