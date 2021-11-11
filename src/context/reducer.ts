import { ActionType, GlobalStateInterface } from './types';

const Reducer = (state: GlobalStateInterface, action: ActionType): any => {
    console.log('ACTION TYPE IN REDUCER:', action.type)
  switch (action.type) {
    case 'SET_QUANTITY':
      return {
        ...state,
        productQuantity: action.payload,
      };
    case 'RESET_PRODUCTS':
      return {
        ...state,
        productQuantity: 0
      };
    case 'SET_PERSISTENCE':
      return {
        ...state,
        persistenceType: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;