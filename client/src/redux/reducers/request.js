import { REQUEST_DOGWALKER, CANCEL_DOGWALKER } from '../action';
import { initRequestState } from './initialState';

function request (state = initRequestState, action) {
  switch (action.type) {
    case REQUEST_DOGWALKER:
      return {
        ...state,
        dogWalkerRequest: [
          ...state.dogWalkerRequest,
          {
            id: action.payload.id,
            dogwalkerId: action.payload.dogwalkerId,
            service: action.payload.service,
            location: action.payload.location,
            date: action.payload.date,
            duration: action.payload.duration,
            price: action.payload.price,
            status: 'pending'
          }
        ]
      };
    case CANCEL_DOGWALKER:
      return { ...state };
    default:
      return state;
  }
}

export default request;
