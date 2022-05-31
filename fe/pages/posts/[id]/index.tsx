import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import postService from "../../../lib/post-service";
import { Post } from "../../../types";
import { MdOutlineDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from "next/router";
import Link from "next/link";
import { Comment } from "../../../types/comments";
import { CommentComponent } from '../../../components/'

const PostDetail: NextPage<Props> = ({ post, comments }: Props) => {

    const router = useRouter();

    const onDelete = async () => {

        try {
            const deleted = await postService.deletePost(post.id)

            if (!deleted) {
                alert('Post not deleted. Error!!')
            }

            router.push('/');
        } catch (error) {
            alert('Post not deleted. Error!!')
        }

    }

    return (
        <div className="container mx-auto mt-20 px-52">
            <Head>
                <title>{post.title}</title>
            </Head>
            <div className="flex flex-row justify-between mb-5">
                <Link href={`/`}>
                    <div className="flex align-middle hover:cursor-pointer">
                        <IoIosArrowBack size={24} />
                        <p className="text-xl font-semibold">All Posts</p>
                    </div>
                </Link>
                <div className="flex space-x-2 ">
                    <Link href={`/posts/${post.id}/edit`}>
                        <button className="rounded bg-green-500 shadow-sm hover:bg-green-600">
                            <div className="p-2 container flex">
                                <MdModeEditOutline size={24} color='white' />
                                <p className="text-white font-mono font-semibold">Edit</p>
                            </div>
                        </button>
                    </Link>
                    <button className="rounded bg-red-500 shadow-sm hover:bg-red-600" onClick={onDelete}>
                        <div className="p-2 container flex">
                            <MdOutlineDeleteOutline size={24} color='white' />
                            <p className="text-white font-mono font-semibold">Delete</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="container shadow-xl p-5 rounded-xl">
                <div className="container mx-auto divide-y space-y-2">
                    <div className="container mx-auto">
                        <h2 className="font-bold font-mono text-2xl text-left">{post.title}</h2>
                    </div>
                    <div className="container mx-auto">
                        <div className="py-10">
                            <p className="text-left text-xl">{post.body}</p>
                        </div>
                    </div>
                </div>
                <div className="container divide-y divide-black">
                    <h2 className="text-bold text-xl mb-1 font-mono">Comments</h2>
                    <div>
                    {
                        comments.map(el => (
                            <div className="mb-5">
                                <CommentComponent
                                    key={el.id}
                                    title={el.name}
                                    user={el.email}
                                    body={el.body}
                                />
                            </div>
                        ))
                    }
                    </div>
                    
                </div>

            </div>

        </div>
    )
}

interface Props {
    post: Post,
    comments: Comment[]
}

interface IStaticProps extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths<IStaticProps> = async () => {

    const postsId = (await postService.getPosts()).map(el => ({
        params: {
            id: el.id.toString()
        }
    }));


    return {
        paths: postsId,
        fallback: false
    }
}


export const getStaticProps: GetStaticProps<Props, IStaticProps> = async ({ params }) => {

    const post = await postService.getPost(parseInt(params!.id));
    const comments = await postService.getPostComments(parseInt(params!.id));

    return {
        props: {
            post: post,
            comments: comments
        }
    }
}

export default PostDetail;