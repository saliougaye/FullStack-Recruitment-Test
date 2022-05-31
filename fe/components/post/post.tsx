import Link from 'next/link';

export interface PostProps {
    id: number,
    title: string
}

export const Post = ({ id, title }: PostProps) : JSX.Element => {
    return (
        <Link href={`/posts/${id}`}>
            <div className="p-1 shadow-lg rounded-lg relative hover:shadow-2xl hover:duration-700 hover:cursor-pointer">
                <div className="p-3 mx-auto mb-5">
                    <h3 className="text-xl font-bold font-mono">{title}</h3>
                </div>
                <div className="absolute bottom-3 right-3">
                    <p className="text-xs text-right">{id}</p>
                </div>
            </div>
        </Link>
    );
}