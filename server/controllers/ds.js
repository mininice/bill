export default {
  	urls: ['/ds'],
  	methods:['POST'],
  	controller: async function (ctx) {
	  	const body = ctx.request.body;
	    const query = ctx.request.query;

		if (!(body.api in ctx.$ds)) {
			return { status: -1, err: '无此数据源' };
		} else {
			const data = await ctx.$ds[body.api](body.params || query, typeof query.mock !== 'undefined');
			return data !== null ? data : { status: -1, err: '未知异常，请刷新页面重新尝试' };
		}
	}
}