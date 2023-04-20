import { RecentPost } from '../../types/Posts';
import Comments from './Comments';
import PostContent from './PostContent';

type Props = {
  post: RecentPost;
};

function RecentPostItem({ post }: Props) {
  return (
    <div
      className="w-full h-full flex p-3 border-solid border-b-2 
     border-gray-200"
    >
      <PostContent post={post} />
      <Comments comments={post.comments}/>
    </div>
  );
}

export default RecentPostItem;
