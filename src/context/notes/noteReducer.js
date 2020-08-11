export const noteInitialState = {
  notes: [],
  fetching: false,
};

export const noteReducer = (state, action) => {
  const { type, payload } = action;

  console.log(action);

  switch (type) {
    default:
      return state;
  }
};
