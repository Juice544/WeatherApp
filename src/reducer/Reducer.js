import { NEW_WEATHER, GET_START_WEATHER } from "../action/actTypes";

/*navigator.geolocation.getCurrentPosition(pos => {
    console.log(pos.coords.latitude, pos.coords.longitude);
  })*/

const initialState = [];

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_START_WEATHER:
      return state.concat(action.data);
    case NEW_WEATHER:
      return [...state, action.data];
    default:
      return state;
  }
};

export default Reducer;
