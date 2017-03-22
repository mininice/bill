//var User = DB.model.User;

/**
 * 创建客栈
 */
export default function *(params) {

  try {
    if(!params.email) {
        return {status: 0, msg: "email必填!", key: "email"};
    }
    if(!params.name) {
        return {status: 0, msg: "name必填!", key: "name"};
    }
    if(!params.password) {
        return {status: 0, msg: "password必填!", key: "password"};
    }

    let result = yield User.findOne({where: {email: params.email}});

    if(result) {
        return {status:0, msg: 'email已存在, 请重新输入!', key: "email"};
    }

    result = yield User.create(params);
    return result;
  } catch (e) {
    // nothing to do (now)
  }

  return null;
}
