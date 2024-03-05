import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostsList from './PostsList';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <PostsList />
      </div>
    </QueryClientProvider>
  );
};

export default App;