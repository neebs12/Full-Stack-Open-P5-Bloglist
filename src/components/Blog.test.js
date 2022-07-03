import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('testing Blog', () => {
  test('blog renders', () => {
    // ARRANGE
    /* Shape of the object being tested
    {
      author: "hellas"
      id: "62929fcedc6c26305d5ddf43"
      likes: 40
      title: "journey from 230-239"
      url: "https://ls.com"
      user: {
        username: 'hellas', 
        name: 'arto hellas', 
        id: '62929ef6dc6c26305d5ddf3c'
      }
    }
    */    
    const blog = {
      author: 'jason', 
      id: '1',
      likes: 10,
      title: 'this is the title!',
      url: 'http://localhost:3000',
      user: {
        username: 'jason',
        name: 'jason ari',
        id: '1'
      }
    }
    const mockHandler = jest.fn()
    // ACT
    render(<Blog blog={blog} setBlogs={mockHandler}/>)
    const element = screen.getByText(
      'this is the title!', 
      {exact: false}
    )

    // ASSERT
    expect(element).toBeDefined()
  })
  test.todo('displays title and author, but not url or number of likes')
})