const {PostModel} = require("../model/post.model");
const postRoute = express.Router();

postRoute.use("/",async(req,res)=>{
    const token = req.headers.authorization;
    const decode = jwt.verify(token,"masai");
    try {
        if(decode){
            const post = await PostModel.find({userID:decode.userID});
            if(post.length>0){
                res.status(200).send(post)
            }else{
                res.status(400).send({"msg":"You haven't added any post"});
            }
        }
    } catch (error) {
        res.status(400).send({msg:error.message});
    }
})

// post 
postRoute.post("/add",async(req,res)=>{
    try {
        const post = new PostModel(req.body);
        await post.save()
        res.status(200).send({"msg":"post added"});
    } catch (error) {
        res.status(400).send({msg:"Failed to post"});
    }
});
// update
postRoute.post("/update/:id", async(req,res)=>{
    const {id} = req.params;
    const payload = req.body;

    try {
        await PostModel.findByIdAndUpdate({_id:id},payload);
        res.status(200).send({"msg":"post updated"});
    } catch (error) {
        res.status(400).send({msg:"Failed to update"});
    }
});

// delete
postRoute.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;

    try {
        await PostModel.findByIdAndDelete({_id:id});
        res.status(200).send({"msg":"post deleted"});
    } catch (error) {
        res.status(400).send({msg:"Failed to delete"});
    }
})

module.exports = {
    postRoute
}