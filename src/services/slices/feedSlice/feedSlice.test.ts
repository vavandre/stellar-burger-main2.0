import feedSlice, { getFeeds, initialState } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice reducer', () => {
  describe('getFeeds async action', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '1',
        ingredients: ['ingredient1', 'ingredient2'],
        status: 'done',
        name: 'Order 1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        number: 1
      },
      {
        _id: '2',
        ingredients: ['ingredient3', 'ingredient4'],
        status: 'pending',
        name: 'Order 2',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        number: 2
      }
    ];
    const mockError = 'Funny mock-error';

    test('should handle pending state', () => {
      const action = {
        type: getFeeds.pending.type
      };

      const state = feedSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
        orders: [],
        total: 0,
        totalToday: 0
      });
    });

    test('should handle rejected state', () => {
      const action = {
        type: getFeeds.rejected.type,
        error: { message: mockError }
      };

      const state = feedSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: mockError
      });
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: getFeeds.fulfilled.type,
        payload: { 
          orders: mockOrders,
          total: 100,
          totalToday: 10
        }
      };

      const state = feedSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: null,
        orders: mockOrders,
        total: 100,
        totalToday: 10
      });
    });
  });
});
