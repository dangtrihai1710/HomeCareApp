import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserStats = createAsyncThunk(
  'user/getUserStats',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock user stats
      const stats = {
        totalOrders: 28,
        completedOrders: 25,
        loyaltyPoints: 1250,
        averageRating: 4.8,
      };

      return stats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  profile: {
    name: 'Nguyễn Văn A',
    phone: '0912345678',
    email: 'user@homecare.com',
    address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  stats: {
    totalOrders: 28,
    completedOrders: 25,
    loyaltyPoints: 1250,
    averageRating: 4.8,
  },
  preferences: {
    notifications: true,
    location: true,
    language: 'vi',
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = { ...state.profile, ...action.payload };
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Get Stats
      .addCase(getUserStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError, updatePreferences, updateProfile } = userSlice.actions;
export default userSlice.reducer;