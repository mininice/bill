

var MindMap = DB.model.MindMap;

/**
 * 
 */
export default async function (ctx, params) {
	var data = await ctx.$ds['mindmapList'](ctx, {type: params.type, name: params.name});
	return {data: data, status: 1};
}
