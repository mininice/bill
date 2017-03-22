var Favorite = DB.model.Favorite;

/**
 * 
 */
export default async function (ctx, params) {
  try {
  	let data = await Favorite.findOne({where: {owner: ctx.User.login}});
  	if(data) {
  		let obj = data.dataValues;
	  	let favorite = JSON.parse(obj.favorite);
	  	let index = favorite.indexOf(params.uuid);
    	if(index > -1) {
    		favorite.splice(index, 1);
    	}
		
		obj.favorite = JSON.stringify(favorite);
		console.log(obj);
	  	return Favorite.update(obj, {where: {owner: ctx.User.login}});
	}
	return null;  	
  } catch (e) {
    // nothing to do (now)
  }

  return null;
}
