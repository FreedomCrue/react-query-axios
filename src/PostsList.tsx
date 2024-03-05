import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import PostDetails from './PostDetails';
import Comments from './Comments';

interface Post {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  name: string;
  body: string;
}

const fetchPosts = async () => {
  const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

const chunkArray = <T extends unknown>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const PostsList: React.FC = () => {
  const { data: posts, isLoading, isError } = useQuery<Post[]>('posts', fetchPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseDetails = () => {
    setSelectedPost(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const paginatedPosts = chunkArray<Post>(posts || [], 15);

  return (
    <div>
      <h1>Список постов</h1>
      <ul>
        {paginatedPosts.map((page, index) => (
          <div key={index}>
            {page.map((post) => (
              <li key={post.id} onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
                <h2>{post.title}</h2>
                <p>{post.body.split('\n')[0]}</p>
              </li>
            ))}
          </div>
        ))}
      </ul>

      {selectedPost && (
        <div className="post-details-overlay">
          <PostDetails post={selectedPost} onClose={handleCloseDetails} />
          <Comments comments={selectedPost.comments} />
        </div>
      )}
    </div>
  );
};

export default PostsList;
