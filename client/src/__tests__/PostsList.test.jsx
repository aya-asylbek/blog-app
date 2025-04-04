import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import PostsList from '../components/PostsList';

test('renders loading state', () => {

  const posts = [];
  
  render(
    <BrowserRouter>
      <PostsList posts={posts} isLoading={true} />
    </BrowserRouter>
  );
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(screen.queryByText(/no posts/i)).toBeNull();
});