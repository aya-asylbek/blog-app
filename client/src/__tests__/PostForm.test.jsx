import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import PostForm from '../components/PostForm';


test('renders form', () => {
  
  render(
    <BrowserRouter>
      <PostForm />
    </BrowserRouter>
  );
  
  expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Source URL/i)).toBeInTheDocument();
});