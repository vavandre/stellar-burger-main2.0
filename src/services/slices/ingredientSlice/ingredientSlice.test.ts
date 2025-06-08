import ingredientSlice, {
  getIngredients,
  initialState
} from './ingredientSlice';

describe('ingredientSlice reducer', () => {
  describe('getIngredients async action', () => {
    const mockIngredients = ['ingr1', 'ingr2'];
    const mockError = 'Funny mock-error';

    test('should handle pending state', () => {
      const action = {
        type: getIngredients.pending.type,
        payload: null
      };

      const state = ingredientSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    test('should handle rejected state', () => {
      const action = {
        type: getIngredients.rejected.type,
        error: { message: mockError }
      };

      const state = ingredientSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: mockError
      });
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      };

      const state = ingredientSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        ingredients: mockIngredients
      });
    });
  });
});
