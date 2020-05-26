const Router=require('koa-router');
const Post=require('../modules/post')

const router=new Router();

router.get('/post',async(ctx,next)=>{
    const {posts}=await Post.list({limit:10});
    ctx.body={
        posts
    };
}).post('/post',async (ctx)=>{
    const {post}=ctx.request.body;
    const created=await Post.create(post);
    ctx.body={
        post:created
    };
});

router.get('/post:id',async (ctx)=>{
    const {id}=ctx.params;
    const found=await Post.getOneById(id);
    ctx.body={
        post:found
    };
})

module.exports=router;

