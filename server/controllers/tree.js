export default {
  urls: ['/tree', '/tree/(.*)?'],
  template: 'tree',
  controller: async function (ctx) {
  	const sourceKey =  ctx.request.url.replace(/\/([a-z]+)?/g, function(x, y, z) {
  		if(z === 0) {
  			return y;
  		} else {
	  		return y.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  		}
  	});
    const dsFn = ctx.$ds[sourceKey];
    if(!dsFn) return {data: {}, msg: '路由匹配有问题, 请检查@'};
    const data = await(dsFn(ctx, {}));
    const mock = await(dsFn(ctx, {}, true));
    return { data, mock, url: ctx.url};
  }
}
