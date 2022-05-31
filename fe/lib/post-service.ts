
import axios from 'axios';
import { Comment } from '../types/comments';
import { Post } from '../types/index';


const postService = () => {

    const url = 'http://localhost:5000';

    const getPosts = async (start = 0, limit = 40) : Promise<Post[]> => {

        const response = await axios.get<Post[]>(`${url}/posts?_start=${start}&_limit=${limit}`);



        return response.data;
    }

    const getPost = async (id: number) : Promise<Post> => {
        
        const response = await axios.get<Post>(`${url}/posts/${id}`);

        return response.data;
    }

    const insertPost = async (post: Post) => {
        const response = await axios.post(
            `${url}/posts`, 
            {
                title: post.title,
                body: post.body,
                userId: post.userId
            }, 
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if(response.status < 300) {
            return true;
        }

        return false;
    }

    const editPost = async (post: Post) => {
        const response = await axios.put(
            `${url}/posts/${post.id}`, 
            {
                id: post.id,
                title: post.title,
                body: post.body,
                userId: post.userId
            }, 
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
        );

        if(response.status < 300) {
            return true;
        }

        return false;
    }

    const deletePost = async(id: number) => {
        const response = await axios.delete(`${url}/posts/${id}`);

        if(response.status < 300) {
            return true;
        }

        return false;
    }

    const getPostComments = async (id: number) => {
        const response = await axios.get<Comment[]>(`${url}/posts/${id}/comments`);

        return response.data;
    }

    return {
        getPosts,
        getPost,
        insertPost,
        editPost,
        deletePost,
        getPostComments
    }
}

export default postService();