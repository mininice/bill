var Favorite = DB.model.Favorite;

/**
 * 
 */
export default async function (ctx, params) {
	let data = await Favorite.findOne({where: {owner: ctx.User.login}});
  console.log(data);
	if(data) {
		let obj = data.dataValues;
  	let favorite = JSON.parse(obj.favorite);
  	let flag = false;
    if(params && favorite.indexOf(params.uuid) > -1) {
      flag = true;
    }

  	return { favorite: favorite, flag: flag };
  }

  return null;
}
