
export default [
{
  urls: ['/', '/list'],
  template: 'list',
  controller: async function(ctx) {
    const data = await ctx.$ds['mindmapList'](ctx, {type: 'release'});
    return { data: data, user: ctx.User.login, page: 'list', type: "release"};
  }
},
{
	urls: ['/list/my'],
	template: 'list',
	controller: async function(ctx) {
    const data = await ctx.$ds['mindmapList'](ctx, {type: 'current-user'});
  	return { data: data, user: ctx.User.login, page: 'list', type: "current-user"};
	}
},
{
  urls: ['/list/favorite'],
  template: 'list',
  controller: async function(ctx) {
    const data = await ctx.$ds['favoriteList'](ctx);
    data.forEach(function(item) {
      item.dataValues.favorite = true;
    })
    return { data: data, user: ctx.User.login, page: 'list', type: 'favorite'};
  }
}
]
