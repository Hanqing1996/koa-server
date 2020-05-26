const Koa=require('koa2');
const bodyParser=require('koa-bodyparser')
const postRouter=require('./routers/post');

const koa=new Koa();

koa.use(bodyParser());
koa.use(postRouter.routes())
    .use(postRouter.allowedMethods());

koa.listen(8888)