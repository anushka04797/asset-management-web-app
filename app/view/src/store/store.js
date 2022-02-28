import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import portableGeneratorSlice from './slices/portableGeneratorSlice'
import userSlice from './slices/userSlice'

export default configureStore({
  reducer: {
    auth:authSlice,
    pg: portableGeneratorSlice,
    users: userSlice
  },
})
