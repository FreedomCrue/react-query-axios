import React from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostDetailsProps {
  post: Post;
  onClose: () => void;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onClose }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PostDetails;
