import { createSlice } from "@reduxjs/toolkit";

const initialCount = {
  value: 0,
};

const CounterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state, payload) => {
      state += 1;
    },
    decrement: (state, payload) => {
      state -= 1;
    },
  },
});

export const { increment, decrement } = CounterSlice.actions;
export default CounterSlice.reducer;
