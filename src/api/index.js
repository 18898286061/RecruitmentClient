import ajax from './ajax'

// 注册接口
export const reqRegister = (user)=> ajax('/register', user, 'POST')

// 登录接口
export const reqLogin = (user)=> ajax('/login', user, 'POST')

// 更新用户接口
export const reqUpdateUser = (user)=> ajax('/update', user, 'POST')

// 获取用户信息
export const reqUser = ()=> ajax('/user')

export const reqUserList = (type)=> ajax('/userlist', {type}, 'GET')

export const reqChatMsgList = ()=> ajax('/msglist')

export const reqReadMsg = (from)=> ajax('/readmsg', {from}, 'POST')