import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (phone.length < 10) {
        throw new Error('Số điện thoại không hợp lệ');
      }
      
      if (password.length < 6) {
        throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
      }

      // Mock user data
      const userData = {
        id: '1',
        name: 'Nguyễn Văn A',
        phone: phone,
        email: 'user@homecare.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        token: 'mock_jwt_token_' + Date.now(),
      };

      // Save token to AsyncStorage
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        return JSON.parse(userData);
      }
      
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUserInfo: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Check Auth Status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      });
  },
});

export const { clearError, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;