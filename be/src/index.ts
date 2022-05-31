import { Post } from "@prisma/client";
import fastify from "fastify";
import postService from "./services/post-service";
import fastifyCors from '@fastify/cors';
const app = fastify({
    logger: true
});

app.register(fastifyCors)


app.get('/posts', async (req, reply) => {

    const posts = await postService.getPosts();

    return reply.code(200).send(posts);
});

app.get<{
    Params: {
        id: string
    }
}>('/posts/:id', async (req, reply) => {

    const { id } = req.params;

    const post = await postService.getPost(parseInt(id));

    if(!post) {
        return reply.code(404).send();
    }

    return reply.code(200).send(post);

});

app.get<{
    Params: {
        id: string
    }
}>('/posts/:id/comments', async (req, reply) => {

    const { id } = req.params;

    const comments = await postService.getComments(parseInt(id));

    return reply.code(200).send(comments);
});


app.post<{
    Body: Post
}>('/posts', async (req, reply) => {

    const post = await postService.insertPost(req.body);

    return reply.code(201).send(post);
});

app.put<{
    Params: {
        id: number
    },
    Body: Post
}>('/posts/:id', async (req, reply) => {

    await postService.updatePost(req.body);

    return reply.code(200).send();
    
});

app.delete<{
    Params: {
        id: string
    }
}>('/posts/:id', async (req, reply) => {

    const { id } = req.params;

    await postService.deletePost(parseInt(id));

    return reply.code(204).send();
    
});


app.listen(5000, '0.0.0.0', (err, address) => {

    if(err) {
        console.log(err);

        process.exit(1);
    }

    console.log(`Server Listen at ${address}`)
})