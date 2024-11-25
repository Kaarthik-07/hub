import Link from "next/link";
import Image from "next/image";

interface PostType {
  post_id: string;
  created_at: string;
  total_views: number;
  user_id: string;
  user_image?: string;
  title: string;
  content: string;
  imageurl?: string;
  tags?: string;
}

const OpenSourceCard = ({ post }: { post: PostType }) => {
  return (
    <li className="opensource-card group">
      <div className="flex-between">
        <p className="opensource_card_date">
          {new Date(post.created_at).toLocaleString()}
        </p>
        <div className="flex gap-1.5">
          <span className="size-6 text-primary">👁️</span>
          <span className="text-16-medium">{post.total_views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.user_id}`}>
            <p className="text-16-medium line-clamp-1">{post.user_id}</p>
          </Link>
          <Link href={`/startup/${post.post_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.user_id}`}>
          {post.user_image ? (
            <Image
              src={post.user_image}
              alt={post.user_id || "Author"}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
              <span>{post.user_id?.charAt(0) || "?"}</span>
            </div>
          )}
        </Link>
      </div>

      <Link href={`/startup/${post.post_id}`}>
        <p
          className="opensource-card_desc"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></p>
        {post.imageurl ? (
          <Image
            src={post.imageurl}
            alt="Post Image"
            className="opensource-card_img"
            width={300}
            height={200}
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </Link>

      <div className="flex-between gap-3 mt-5">
        <p className="text-16-medium">{post.tags}</p>
        <Link href={`/startup/${post.post_id}`}>
          <button className="opensource-card_btn">Details</button>
        </Link>
      </div>
    </li>
  );
};

export default OpenSourceCard;
