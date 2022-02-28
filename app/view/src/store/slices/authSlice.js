import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../config'
const initialState = {
  data: [],
  status: 'idle',
  error: ''
}

export const fetchUserDetailsThunk = createAsyncThunk('auth/user', async (user_id) => {
  const response = await JsonClient.get('auth/user/details/' + user_id+'/')
  console.log("user details", response)
  return response.data
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData:(state,action)=>{
      state.data=action.payload
    }
  },
  extraReducers: {
    [fetchUserDetailsThunk.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUserDetailsThunk.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchUserDetailsThunk.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { setAuthData} = authSlice.actions
export default authSlice.reducer
