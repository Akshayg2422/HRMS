import {
  SHOW_LOADER,
  HIDE_LOADER
} from "./actionsType";

const initialState = {
  loading: false,
}

const AppReducer = (state = initialState, action) => {

  switch (action.type) {
    case SHOW_LOADER:
      console.log(SHOW_LOADER+"=========");
      state = {
        ...state,
        loading: true,
      };
      break;
    case HIDE_LOADER:
      state = {
        ...state,
        loading: false,
      };
      break;
    default:
      state = state;
      break;
  }
  return state;
}


export default AppReducer;