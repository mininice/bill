var MindMap = DB.model.MindMap;

/**
 * 
 */
export default async function (ctx, params) {

  try {
  	return MindMap.update(params, {where: {uuid: params.uuid}});
  } catch (e) {
    // nothing to do (now)
  }

  return null;
}
