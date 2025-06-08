import orderSlice, { initialState, getOrderByNumber } from './orderSlice';

describe('orderSlice reducer', () => {
  describe('getOrderByNumber async action', () => {
    const mockOrder = 'someOrder';
    const mockError = 'Funny mock-error';

    test('should handle pending state', () => {
      const action = {
        type: getOrderByNumber.pending.type,
        payload: null
      };

      const state = orderSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: true,
        error: null
      });
    });

    test('should handle rejected state', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: mockError }
      };

      const state = orderSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: false,
        error: mockError
      });
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [mockOrder] }
      };

      const state = orderSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: false,
        error: null,
        orderByNumberResponse: mockOrder
      });
    });
  });
});
