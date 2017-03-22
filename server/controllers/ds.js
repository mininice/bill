export default {
  	urls: ['/ds'],
  	methods:['POST'],
  	controller: async function (ctx) {
	  	const body = ctx.request.body;
	    const query = ctx.request.query;
	    console.log('------------------');
	    console.log('request to:' + body.api,  '\nparams is:' + JSON.stringify(body.params));
	    console.log('------------------');


		if (!(body.api in ctx.$ds)) {
			return { status: 0, err: '无此数据源' };
		} else {
			let data = await ctx.$ds[body.api](ctx, body.params || query, typeof query.mock !== 'undefined');
			console.log(data);
			if(!data) {
				return { status: 0, err: '无数据或未知异常，请刷新页面重新尝试' }
			} else if( data.dataValues) {
				return {data: data.dataValues, msg: '操作成功', status: 1 };
			} else if( typeof data === 'object' && data[0] === 1 ) {
				return {data: data, msg: '操作成功', status: 1};				
			} else {
				return data;
			}
		}
	}
}