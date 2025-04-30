import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Post } from '../../types/post';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  type Comment = { id: number; text: string; };

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (commentInput.trim() === "") return;
    setComments([
      ...comments,
      { id: Date.now(), text: commentInput }
    ]);
    setCommentInput("");
  };

  return (
    <div className="card animate-scale-in">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-start">
          <Link to={`/profile/${post.author.id}`}>
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-100" 
            />
          </Link>
          <div>
            <div className="flex items-center">
              <Link to={`/profile/${post.author.id}`} className="font-medium text-gray-900 hover:text-primary-700">
                {post.author.name}
              </Link>
              {post.author.role === 'club' && (
                <span className="ml-2 badge badge-primary">Club</span>
              )}
              {post.author.role === 'college' && (
                <span className="ml-2 badge badge-accent">College</span>
              )}
              {/* Visibility indicator */}
              {post.visibility === 'public' && (
                <span className="ml-2 text-xs text-gray-500">• Public</span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-0.5 flex items-center">
              {post.author.role === 'student' && post.author.college && (
                <>
                  <span>{post.author.college}</span>
                  <span className="mx-1">•</span>
                </>
              )}
              <span>{post.timeAgo}</span>
            </div>
          </div>
        </div>
        <button className="p-1 rounded-full hover:bg-gray-100">
          <MoreHorizontal size={18} className="text-gray-500" />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 mb-3">{post.content}</p>
        
        {/* Post Image (if available) */}
        {post.image && (
          <div className="rounded-md overflow-hidden mb-3">
            <img src={post.image} alt="Post attachment" className="w-full h-auto" />
          </div>
        )}
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.map((tag, index) => (
              <Link 
                key={index} 
                to={`/search?tag=${tag}`}
                className="badge badge-secondary"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
        
        {/* Engagement Stats */}
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <div className="flex items-center">
            <ThumbsUp size={14} className="text-primary-700" />
            <span className="ml-1">{likeCount}</span>
          </div>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <MessageCircle size={14} />
            <span className="ml-1">{post.comments}</span>
            <span className="ml-1">comments</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="border-t border-gray-100 px-4 py-2">
        <div className="flex justify-between">
          <button 
            onClick={handleLike} 
            className={`flex items-center justify-center flex-1 py-1.5 rounded-md text-sm font-medium ${
              liked 
                ? 'text-primary-700 hover:bg-primary-50' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ThumbsUp size={18} className={liked ? 'text-primary-700' : 'text-gray-500'} />
            <span className="ml-2">Like</span>
          </button>
          
          <button 
            className="flex items-center justify-center flex-1 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setShowComments((prev) => !prev)}
          >
            <MessageCircle size={18} className="text-gray-500" />
            <span className="ml-2">Comment</span>
          </button>
          
          <button className="flex items-center justify-center flex-1 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Share2 size={18} className="text-gray-500" />
            <span className="ml-2">Share</span>
          </button>
        </div>
      </div>
      
      {/* Comment Section */}
      {showComments && (
        <div className="px-4 pb-4">
          {/* Comment List */}
          <div className="mb-2">
            {comments.length === 0 ? (
              <div className="text-sm text-gray-400">No comments yet.</div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="mb-1 text-gray-700 text-sm border-b border-gray-100 pb-1">
                  {c.text}
                </div>
              ))
            )}
          </div>
          {/* Add Comment Form */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddComment}
              disabled={commentInput.trim() === ""}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;