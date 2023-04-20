import { Comment } from '../../types/Posts';

type Props = {
  comment: Comment;
};
function PostComment({ comment }: Props) {
  return (
    <div className="w-full border-b-2 border-solid border-gray-200 mb-2">
      <div className='flex cursor-pointer'>
        <h4 className="font-semibold mb-2">{comment.nickname}</h4>
      </div>
      <span className="">{comment.content}</span>
    </div>
  );
}

export default PostComment;
