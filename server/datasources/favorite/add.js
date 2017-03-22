const  Favorite = DB.model.Favorite;
const MindMap = DB.model.MindMap;


/**
 * 
 */
export default async function (ctx, params) {

    let obj = {};
    let data = await Favorite.findOne({where: {owner: ctx.User.login}});

    if(data) {
      obj = data.dataValues;
      let favorite = JSON.parse(obj.favorite);

      if(favorite.indexOf(params.uuid) < 0) favorite.push(params.uuid);  
      
      obj.favorite = JSON.stringify(favorite);

      return Favorite.update(obj, {where: {owner: ctx.User.login}});
    } else {
      obj.favorite = [params.uuid];
      obj.favorite = JSON.stringify(obj.favorite);
      console.log('enter', obj);

      obj.owner = ctx.User.login;
      return Favorite.create(obj);
    }
 

  return null;
}
