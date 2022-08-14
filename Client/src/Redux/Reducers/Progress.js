const progressReducer = (initialState = { isProgress: false }, action) => {
  if (action.type === "HOME_PROGRESS") return action.payload;
  else return initialState;
};

export default progressReducer;
