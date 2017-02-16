import bodyParser from 'koa-bodyparser'

const bp = bodyParser()

export default async function(ctx, next) {
  await bp.call(this, ctx, next)
}
