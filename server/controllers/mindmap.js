export default [
{
  urls: ['/mindmap/help'],
  template: 'mindmap',
  method: ['GET'],
  controller: async function(ctx) {
    return {page: 'help'};
  }
},
{
  urls: ['/mindmap/:uuid'],
  template: 'mindmap',
  controller: async function (ctx) {
    const uuid = ctx.params.uuid;
    if(uuid) {
      const dsFn = ctx.$ds['mindmapGet'];
      let data = await(dsFn(ctx, {uuid: uuid}));

      let favorite = await(ctx.$ds['favoriteGet'](ctx, {uuid: uuid})) || {};
      if(data) data = data.dataValues;
      return { data: data, user: ctx.User.login, favorite: favorite.flag || false, page: 'mindmap'};
    } else  {
      return { status:0, msg: '参数不正确', page: 'mindmap'};
    }
  }
}
]
