import { Comment } from '../../types/Posts';
import PostComment from './PostComment';

type Props = {
  comments: Comment[];
};

function Comments({ comments }: Props) {
  return (
    <div className="flex flex-col px-2.5 w-2/5">
      {comments.map((comment) => (
        <PostComment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default Comments;
