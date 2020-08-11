export const initialState = {
  user: null,
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER': {
      return {
        ...state,
        user: payload.user,
      };
    }
    default:
      return state;
  }
};
