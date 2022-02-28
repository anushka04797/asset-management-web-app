import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { pg_generators } from 'data/data'
import { JsonClient, USER_ID } from '../../config'


const initialState = {
  data: [],
  status: 'idle',
  error: ''
}

export const fetchPortableGenerators = createAsyncThunk('wbs/fetchPortableGenerators', async (type) => {
  const response = await JsonClient.get('devices/data/pg/1?type='+type)
  console.log("all devices daily data", response)
  return response.data
  // return pg_generators
})

export const portableGeneratorSlice = createSlice({
  name: 'portable_generators',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchPortableGenerators.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPortableGenerators.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchPortableGenerators.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function

export default portableGeneratorSlice.reducer
