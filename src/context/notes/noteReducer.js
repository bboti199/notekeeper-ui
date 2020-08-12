export const noteInitialState = {
  selectedNoteId: null,
};

export const noteReducer = (state, action) => {
  const { type, payload } = action;

  console.log(action);

  switch (type) {
    case 'SET_SELECTED_NOTE':
      return {
        ...state,
        selectedNoteId: payload.id,
      };
    default:
      return state;
  }
};
