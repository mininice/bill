var User = DB.model.User;

/**
 * 创建客栈
 */
export default function *(params) {

  try {
    if(!params.email) {
        return {status: 0, msg: "email必填!", key: "email"};
    }
    if(!params.password) {
        return {status: 0, msg: "password必填!", key: "password"};
    }

    let result = yield User.findOne({where: {email: params.email, password: params.password}});

    if(!result) {
        return {status:0, msg: '账号或密码不匹配, 请检查!'};
    } else {
        return {status: 1, msg: "登录成功"};
    }
  } catch (e) {
    // nothing to do (now)
  }

  return null;
}
