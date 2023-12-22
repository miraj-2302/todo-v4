import { configureStore } from '@reduxjs/toolkit'
import userSlice from './pages/slices/userSlice'

export default configureStore({
  reducer: {
    userLoginInfo :userSlice,
  }
})