import { Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

process.on('SIGTERM', () => {
    prisma.$disconnect();
})

const postService =  () => {

    const getPosts = async () => {
        const posts = await prisma.post.findMany();

        return posts;
    }

    const getPost = async (id: number) => {
        const post = await prisma.post.findFirst({
            where: {
                id: id
            }
        });

        return post;
    }

    const insertPost = async (post: Post) => {

        const postCreated = await prisma.post.create({
            data: {
                title: post.title,
                body: post.body,
                userId: 1,
            }
        });

        return postCreated;
    }

    const updatePost = async (post: Post) => {
        await prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                title: post.title,
                body: post.body,
            }
        });
    }

    const deletePost = async (id: number) => {

        await prisma.post.delete({
            where: {
                id: id
            }
        });

    }

    const getComments = async (postId: number) => {
        const comments = await prisma.comment.findMany({
            where: {
                postId: postId
            }
        });

        return comments;
    }

    return {
        getPost,
        getPosts,
        insertPost,
        updatePost,
        deletePost,
        getComments
    }

}


export default postService();