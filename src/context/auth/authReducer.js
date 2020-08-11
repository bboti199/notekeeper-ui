export const authInitialState = {
  user: null,
  error: null,
  loading: false,
  initialLoading: true,
};

export const authReducer = (state, action) => {
  const { type, payload } = action;

  //console.log(action);

  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        user: payload.user,
        initialLoading: false,
      };

    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
