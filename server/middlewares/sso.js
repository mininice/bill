// 执行sso登录认证
const log = console.log;

export default async function(ctx, next) {
	await (new Promise(function(resolve, reject) {
		ctx.sso.ssoify(ctx.req, ctx.res, function(err, props) {
			if(err) {
				reject(err);
			} else {
			 	ctx.User = props.user;
				resolve(props);
			}
		})
	}))
	await next();
}


