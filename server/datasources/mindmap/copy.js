
var MindMap = DB.model.MindMap;

/**
 * 创建mindmap
 */
export default async function (ctx, params) {

  try {
    if(params.uuid) {
        //编辑
      let result = await MindMap.findOne({where: {uuid: params.uuid}});
      let obj = result.dataValues;

      obj.owner = ctx.User.login;
      obj.name = obj.name + '－副本';
      delete obj.uuid;
      return MindMap.create(obj);
    } else {
        return {status:0, msg: '参数错误', key: "uuid"};
    }

  } catch (e) {
    // nothing to do (now)
    console.log(e);
  }

  return null;
}
