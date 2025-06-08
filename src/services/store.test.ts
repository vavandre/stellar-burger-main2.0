import { rootReducer } from '../services/store';
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('should return initial state for unknown action', () => {
    const store = configureStore({
      reducer: rootReducer
    });
    
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(store.getState());
  });
});
