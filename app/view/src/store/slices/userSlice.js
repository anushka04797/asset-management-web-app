import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../config'
const initialState = {
  data: [],
  status: 'idle',
  error: ''
}

export const fetchUsersData = createAsyncThunk('wbs/fetchUsersData', async (data) => {
  const response = await JsonClient.get('auth/user/list/')
  console.log("all users data", response)
  return response.data
})


export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchUsersData.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUsersData.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchUsersData.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function

export default userSlice.reducer
