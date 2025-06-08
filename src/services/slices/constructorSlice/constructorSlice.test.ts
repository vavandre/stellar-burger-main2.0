import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

// Test data
const mockIngredients = {
  sauce: {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  },
  bun1: {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  bun2: {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  }
};

describe('constructorSlice reducer tests', () => {
  describe('addIngredient action', () => {
    const baseState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('should add ingredient to ingredients array', () => {
      const newState = constructorSlice(baseState, addIngredient(mockIngredients.sauce));
      const addedIngredient = newState.constructorItems.ingredients[0];

      expect(addedIngredient).toEqual({
        ...mockIngredients.sauce,
        id: expect.any(String)
      });
    });

    test('should add bun to empty bun slot', () => {
      const newState = constructorSlice(baseState, addIngredient(mockIngredients.bun1));
      const addedBun = newState.constructorItems.bun;

      expect(addedBun).toEqual({
        ...mockIngredients.bun1,
        id: expect.any(String)
      });
    });

    test('should replace existing bun', () => {
      const stateWithBun = {
        ...baseState,
        constructorItems: {
          ...baseState.constructorItems,
          bun: { ...mockIngredients.bun1, id: 'existing-bun-id' }
        }
      };

      const newState = constructorSlice(stateWithBun, addIngredient(mockIngredients.bun2));
      const updatedBun = newState.constructorItems.bun;

      expect(updatedBun).toEqual({
        ...mockIngredients.bun2,
        id: expect.any(String)
      });
    });
  });

  describe('removeIngredient action', () => {
    const stateWithIngredient = {
      constructorItems: {
        bun: null,
        ingredients: [{ ...mockIngredients.sauce, id: 'test-id' }]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('should remove ingredient by id', () => {
      const newState = constructorSlice(stateWithIngredient, removeIngredient('test-id'));
      expect(newState.constructorItems.ingredients).toHaveLength(0);
    });
  });

  describe('moveIngredient actions', () => {
    const stateWithMultipleIngredients = {
      constructorItems: {
        bun: { ...mockIngredients.bun1, id: 'bun-id' },
        ingredients: [
          { ...mockIngredients.sauce, id: 'ingredient-1' },
          { ...mockIngredients.sauce, id: 'ingredient-2' },
          { ...mockIngredients.sauce, id: 'ingredient-3' }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('should move ingredient up', () => {
      const newState = constructorSlice(stateWithMultipleIngredients, moveIngredientUp(2));
      expect(newState.constructorItems.ingredients[1].id).toBe('ingredient-3');
    });

    test('should move ingredient down', () => {
      const newState = constructorSlice(stateWithMultipleIngredients, moveIngredientDown(1));
      expect(newState.constructorItems.ingredients[2].id).toBe('ingredient-2');
    });
  });

  describe('orderBurger async action', () => {
    const mockActions = {
      pending: {
        type: orderBurger.pending.type,
        payload: null
      },
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'Test error' }
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: 123 } }
      }
    };

    test('should handle pending state', () => {
      const state = constructorSlice(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('should handle rejected state', () => {
      const state = constructorSlice(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(mockActions.rejected.error.message);
      expect(state.orderModalData).toBeNull();
    });

    test('should handle fulfilled state', () => {
      const state = constructorSlice(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orderModalData?.number).toBe(mockActions.fulfilled.payload.order.number);
    });
  });
});
