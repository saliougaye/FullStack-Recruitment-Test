import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import postService from "../../lib/post-service";

interface FormInput {
    title: string,
    body: string
}

const NewPost: NextPage = () => {


    const route = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>()

    const onSubmit : SubmitHandler<FormInput> = async (data) => {

        try {

            const inserted = await postService.insertPost({
                id: -1,
                title: data.title,
                body: data.body,
                userId: 1
            });

            // FIXME add state with alert
            if(!inserted) {
                alert('Post not inserted. Error!');

                return;
            }

            route.back();
            
            
        } catch (error) {
            alert('Post not inserted. Error!')
        }

        
    }

    return (
        <div className="container mx-auto mt-20">
            <Head>
                <title>New Post</title>
            </Head>

            <div className="container divide-y">
                <h1 className="text-xl font-bold font-mono">New Post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container mx-auto">
                        <div className="flex flex-col mb-4">
                            <label htmlFor='title' className="font-bold font-mono text-xl mb-2 block" >Title</label>
                            <input 
                                {...register("title", { required: "Please, type the title" })}
                                className="rounded-lg border shadow-md p-2 text-gray-700" 
                                type='text' 
                                id='title' 
                                placeholder='Title' 
                            />
                            { 
                                errors.title && errors.title.type === 'required' 
                                && 
                                <p className="text-red-600 italic">{errors.title.message}</p> 
                            }
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor='body' className="font-bold font-mono text-xl mb-2 block">Body</label>
                            <textarea
                                {...register("body", { required: "Please, type the body of the post" })}
                                className="resize-none rounded-lg border shadow-md p-2 text-gray-700 h-52 text-lg"
                            ></textarea>
                            { 
                                errors.body && errors.body.type === 'required' 
                                && 
                                <p className="text-red-600 italic">{errors.body.message}</p> 
                            }
                        </div>
                        <div className="flex flex-row justify-end mt-5">
                            <button className="rounded bg-green-500 shadow-sm hover:bg-green-600" type='submit'>
                                <div className="p-2 flex space-x-1">
                                    <BiSave size={24} color='white' />
                                    <p className="text-white font-mono">Save</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default NewPost;