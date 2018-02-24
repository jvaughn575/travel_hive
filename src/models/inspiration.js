export default {
  namespace: 'inspiration',
  state: [],
  reducers: {
    addInspiration(state, { payload }) {
      return [...state, payload];
    },
  },
};
