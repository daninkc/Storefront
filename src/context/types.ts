import { Dispatch } from 'react';

export interface GlobalStateInterface {
  productQuantity: number;
  isUserAuthenticated: boolean;
  loggedUser: string;
  persistenceType: string;
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};