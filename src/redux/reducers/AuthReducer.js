import { createReducer } from '@reduxjs/toolkit'
import { authAPI } from '../../services/authAPI'

const initialState = {
  token: null
}

export default createReducer(initialState, (builder) => {
  builder.addMatcher(
    authAPI.endpoints.login.matchFulfilled,
    (state, action) => {
      return {
        ...state,
        token: action.payload.token
      }
    }
  )
})
