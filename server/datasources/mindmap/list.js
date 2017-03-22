var MindMap = DB.model.MindMap;

/**
 * 
 */
export default async function (ctx, params) {

	let result = null;
  let searchParams = {};
  if(params.name) {
    searchParams.name = {
      $like: '%' + params.name + '%'
    };  
  }

	if(params.type === 'release') {
    searchParams.release = true;

	} else if(params.type === 'current-user') {
    
    searchParams.owner = ctx.User.login;

  } else {
	}

  result = await MindMap.findAll({where: searchParams, order: 'createdAt DESC', limit: 50});

  const favoriteList = await ctx.$ds['favoriteGet'](ctx);

  result.forEach(function(item, index) {
    item = item.dataValues;
    if(favoriteList.favorite.indexOf(item.uuid) > -1) {
      item.favorite = true;
    } else {
      if(params.type === "favorite") {
        result.splice(index, 1);
      } 
    }
  });
  console.log(result.length);
  return result;

}
