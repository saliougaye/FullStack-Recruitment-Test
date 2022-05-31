import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import postService from '../lib/post-service';
import type { Post } from '../types';
import { Post as PostComponent } from '../components/index'
import Link from 'next/link';
import { VscNewFile } from 'react-icons/vsc';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';

const Home: NextPage<Props> = ({ posts, error } : Props) => {

  const [currentPosts, setCurrentPosts] = useState(posts);

  const fetch = async () => {
    const posts = await postService.getPosts(currentPosts.length, 40);

    setCurrentPosts(
      [...currentPosts, ...posts]
    );
  }

  return (
    <div className='w-full'>
      <Head>
        <title>Recruitment Test</title>
        <meta name="description" content="Recruitment Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container mx-auto mt-6 mb-10'>
        <h1 className='text-3xl font-bold text-center font-mono'>
          Hello Tailwind 👋🏿
        </h1>
      </div>
      <div className='container mx-auto mt-3 divide-y'>
        <div className='flex flex-row justify-between'>
          <div>
            <h1 className='text-3xl font-bold font-mono'>
              Posts
            </h1>
          </div>
          <div className='p-1'>
            <Link href={`/posts/new`}> 
              <button className="rounded bg-green-500 shadow-sm hover:bg-green-600">
                  <div className="p-2 container flex space-x-2">
                      <VscNewFile size={24} color='white' />
                      <p className="text-white font-mono font-semibold">New</p>
                  </div>
              </button>
            </Link>
          </div>
        </div>
        {
          error && (
            <div>
              <p className='text-center font-bold text-lg'></p>
            </div>
          )
        }
        
        <div className='grid grid-cols-1'>
          <InfiniteScroll
            dataLength={currentPosts.length}
            loader={<p>Loading...</p>}
            next={fetch}
            hasMore={false}
          >
            {
              currentPosts.map(el => (
                <PostComponent id={el.id} title={el.title} key={el.id} />
              ))
            }
          </InfiniteScroll>
          
        </div>
      </div>
    </div>
  )
}

interface Props {
  error?: Error,
  posts: Post[]
}

export const getStaticProps : GetStaticProps<Props> = async (context) => {

  try {
    const posts = await postService.getPosts();

    return {
      props: {
        posts: posts
      }
    }
  } catch (error: any) {
    

    console.log(error)
    return {
      props: {
        posts: [],
        error: error
      }
    }  
  }

  
}


export default Home;
