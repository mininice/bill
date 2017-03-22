

var MindMap = DB.model.MindMap;

/**
 * 创建mindmap
 */
export default async function (ctx, params) {

  try {
    if(params.uuid) {
        //编辑
        return MindMap.update(params, {where: {uuid: params.uuid}});
    } else {
      if(!params.name) {
        return {status: 0, msg: "name必填!", key: "name"};
      } 

      let result = await MindMap.findOne({where: {name: params.name}});

      if(result) {
        return {status:0, msg: '名称已存在, 请重新输入!', key: "name"};
      }  else {
        params.owner = ctx.User.login;
        params.release = false;
        return MindMap.create(params);
      }
    }

  } catch (e) {
    // nothing to do (now)
    console.log(e);
  }

  return null;
}
