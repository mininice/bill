const Favorite = DB.model.Favorite;
const MindMap = DB.model.MindMap;


/**
 * 
 */
export default async function (ctx, params) {

  try {
  	let data = await Favorite.findOne({where: {owner: ctx.User.login}});
  	if(data) {
	  	let favorite = JSON.parse(data.dataValues.favorite);

	  	let datas = await MindMap.findAll({where: {
	  		uuid: {
	  			$or: favorite
	  		}
	  	}});
	  	return datas;
  	}
  } catch (e) {
    // nothing to do (now)
  }

  return null;
}
