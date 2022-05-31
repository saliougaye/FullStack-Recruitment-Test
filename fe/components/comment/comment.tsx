export interface CommentProps {
    title: string,
    user: string,
    body: string
}


export const CommentComponent = ({ title, user, body }: CommentProps) => {
    return (
        <div className="container w-full divide-y py-3">
            <div className="flex justify-between">
                <div>
                    <p className="text-xl">{ title }</p>
                </div>
                <div>
                    <p className="text-lg text-gray-500"> { user }</p>
                </div>
            </div>
            <div className="container">
                <p className="text-sm"> { body } </p>
            </div>
        </div>
    );
}