//  包含n个 Reducer 函数：根据旧的 State 和制定的 Action 返回一个新的State
import { combineReducers } from 'redux'
import { 
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
 } from './actionTypes'

import { getRedirectTo } from '../utils'

const defaultUser = {
  userName: '',
  type: '',
  msg: '',
  redirectTo: ''
}

const defaultUserList = []

const defaultChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
}

// 产生 user 状态 reducer
function user(state=defaultUser, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      const { type, avatar } = action.data
      return {...action.data, redirectTo: getRedirectTo(type, avatar)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...defaultUser, msg: action.data}
    default:
      return state
  }
}

function userList(state=defaultUserList, action) {
  switch(action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  } 
}

function chat(state=defaultChat, action) {
  switch(action.type) {
    case RECEIVE_MSG_LIST: 
      const { users, chatMsgs, userid } = action.data
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal, msg)=> 
          preTotal + (!msg.read && msg.to === userid ? 1 : 0),0)
      }
    case RECEIVE_MSG:
      const { chatMsg } = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg], //在后面加一个chatMSG,原来的不变
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
      }
    case MSG_READ:
      const {from, to, count} = action.data
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg=> {
          if(msg.from === from && msg.to === to && !msg.read) {
            return { ...msg, read: true}
          } else {
            return msg
          }
        }),
        unReadCount: state.unReadCount - count
      }
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  chat
})