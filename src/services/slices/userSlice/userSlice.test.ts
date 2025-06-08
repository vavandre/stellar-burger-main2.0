import userSlice, {
  getUser,
  getOrdersAll,
  initialState,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from './userSlice';

describe('userSlice reducer', () => {
  const mockUser = { name: 'someName', email: 'someEmail' };
  const mockError = 'Funny mock-error';
  const mockOrders = ['order1', 'order2'];

  describe('getUser async action', () => {
    test('should handle pending state', () => {
      const action = {
        type: getUser.pending.type
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isAuthenticated: true,
        isAuthChecked: true,
        loginUserRequest: true
      });
    });

    test('should handle rejected state', () => {
      const action = {
        type: getUser.rejected.type
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isAuthenticated: false,
        isAuthChecked: false,
        loginUserRequest: false
      });
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isAuthenticated: true,
        loginUserRequest: false,
        userData: mockUser,
        isAuthChecked: false
      });
    });
  });

  describe('getOrdersAll async action', () => {
    test('should handle pending state', () => {
      const action = {
        type: getOrdersAll.pending.type
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: true,
        error: null
      });
    });

    test('should handle rejected state', () => {
      const action = {
        type: getOrdersAll.rejected.type,
        error: { message: mockError }
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: false,
        error: mockError
      });
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: getOrdersAll.fulfilled.type,
        payload: mockOrders
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: false,
        error: null,
        userOrders: mockOrders
      });
    });
  });

  describe('registerUser async action', () => {
    test('should handle pending state', () => {
      const action = {
        type: registerUser.pending.type
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: true,
        error: null,
        isAuthChecked: true,
        isAuthenticated: false
      });
    });

    test('should handle rejected state', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: mockError }
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: false,
        error: mockError,
        isAuthChecked: false
      });
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: false,
        error: null,
        response: mockUser,
        userData: mockUser,
        isAuthChecked: false,
        isAuthenticated: true
      });
    });
  });

  describe('loginUser async action', () => {
    test('should handle pending state', () => {
      const action = {
        type: loginUser.pending.type
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loginUserRequest: true,
        error: null,
        isAuthChecked: true,
        isAuthenticated: false
      });
    });

    test('should handle rejected state', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: mockError }
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loginUserRequest: false,
        isAuthChecked: false,
        error: mockError
      });
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        error: null,
        loginUserRequest: false,
        isAuthChecked: false,
        isAuthenticated: true,
        userData: mockUser
      });
    });
  });

  describe('updateUser async action', () => {
    test('should handle pending state', () => {
      const action = {
        type: updateUser.pending.type
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: true,
        error: null
      });
    });

    test('should handle rejected state', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: mockError }
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: false,
        error: mockError
      });
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        request: false,
        error: null,
        response: mockUser
      });
    });
  });

  describe('logoutUser async action', () => {
    test('should handle pending state', () => {
      const action = {
        type: logoutUser.pending.type
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isAuthenticated: true,
        isAuthChecked: true,
        error: null,
        request: true
      });
    });

    test('should handle rejected state', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { message: mockError }
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isAuthenticated: true,
        isAuthChecked: false,
        error: mockError,
        request: false
      });
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: logoutUser.fulfilled.type
      };

      const state = userSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isAuthenticated: false,
        isAuthChecked: false,
        error: null,
        request: false,
        userData: null
      });
    });
  });
});
