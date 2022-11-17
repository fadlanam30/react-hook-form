import { createReducer } from '@reduxjs/toolkit'
import { addTodoAction } from '../actions/TodoAction'

const initialState = {
  todos: []
}

export default createReducer(initialState, (builder) => {
  builder.addCase(addTodoAction, (state, action) => {
    return {
      ...state,
      todos: [action.payload, ...state.todos]
    }
  })
})

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TODO_ACTION:
//       return {
//         ...state,
//         todos: [action.payload, ...state.todos]
//       }
//     default:
//       return state
//   }
// }
