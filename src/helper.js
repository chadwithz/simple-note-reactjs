// initial state for all reducers
export const initialState = {
  isLoading: false,
  error: {
    state: false,
    message: "",
  },
  isSuccess: false,
  data: null,
};

/**
 * basic redux reducers
 * @param {object} state state of the reducer.
 * @param {object} action action of the reducer.
 * @param {string} asyncState the type of async action.
 */
export const createBasicReducer = (state, action, asyncState) => {
  switch (asyncState) {
    case "PENDING":
      state.isLoading = true;
      state.error = {
        message: null,
        state: false,
      };
      state.isSuccess = false;
      break;
    case "FULFILLED":
      state.isLoading = false;
      state.error = {
        message: null,
        state: false,
      };
      state.isSuccess = true;
      state.data = action.payload;
      break;
    default:
      state.isLoading = false;
      state.error = {
        message: action.error.message ?? "Something went wrong",
        state: true,
      };
      state.isSuccess = false;
  }
};
