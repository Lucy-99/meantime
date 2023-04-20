import { FaHeart, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RecentPost } from '../../types/Posts';
import { UTCtoKST } from '../../utils/UTCtoKST';

type Props = {
  post: RecentPost;
};

function PostContent({ post }: Props) {
  const navigate = useNavigate();
  return (
    <div className="h-full flex w-3/5 border-solid border-r-2 border-gray-200">
      <div className="flex flex-col w-5/12 h-5/6 ">
        <img src={post.image} alt="" className="w-full" />
        <div className="mt-2 w-full flex justify-between">
          <FaHeart className="text-teal-500 cursor-pointer" />
          <span>{post.likes} likes</span>
        </div>
      </div>
      <div className="w-7/12 flex flex-col px-3">
        <div className="flex justify-between pb-2 items-end border-b-2 border-solid border-gray-200">
          <h3 className="font-bold text-2xl">{post.title}</h3>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => navigate(`/profile/${post.userAddress}`)}
          >
            {post.avatar ? <img src={post.avatar} className="w-9 h-9 rounded-full"/> : <FaUserCircle className="text-4xl" />}
            <h4 className="text-xl ml-1">{post.nickname}</h4>
          </div>
        </div>
        <div className="w-full mt-1 flex justify-between">
          <span className=" text-gray-400">{UTCtoKST(post.createdAt)}</span>
          <a
            href={`https://goerli.etherscan.io/token/${post.contract}?a=${post.tokenId}`}
            className="text-gray-400 italic underline"
          >
            etherscan
          </a>
        </div>
        <p className="py-2 h-full overflow-auto">{post.content}</p>
      </div>
    </div>
  );
}

export default PostContent;
