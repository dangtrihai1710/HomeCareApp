import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock booking response
      const booking = {
        id: Date.now().toString(),
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      return booking;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBookings = createAsyncThunk(
  'booking/getBookings',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock bookings data
      const bookings = [
        {
          id: '1',
          serviceName: 'Sửa máy lạnh',
          providerName: 'Thợ điện lạnh ABC',
          status: 'completed',
          price: '450.000 VND',
          completedDate: '15/05/2024',
        }
      ];

      return bookings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings.push(action.payload);
        state.currentBooking = action.payload;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Get Bookings
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingError, setCurrentBooking, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;