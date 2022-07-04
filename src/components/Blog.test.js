import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('testing Blog', () => {
  let container
  let mockHandler

  beforeEach(() => {
    const blog = { 
      author: 'jason', 
      id: '1',
      likes: 10,
      title: 'this is the title!',
      url: 'http://localhost:3000',
      user: {
        username: 'jason_232',
        name: 'jason ari',
        id: '1'
      }
    }

    mockHandler = jest.fn()

    container = render(
      <Blog blog={blog} updateABlog={mockHandler}/>
    ).container
  })

  test('blog renders', () => {
    // ARRANGE 
    // <--- in beforeEach

    // ACT
    const element = screen.getByText(
      'this is the title!', 
      {exact: false}
    )

    // ASSERT
    expect(element).toBeDefined()
  })

  test('does not display url or number of likes by default', () => {
    // ARRANGE
    // <--- in beforeEach
    
    // ACT
    const element = container.querySelector('.hidden')
    const haveUsername = screen.getByText(
      'jason_232', 
      {exact: false}
    )
    const haveUrl = screen.getByText(
      'http://localhost:3000',
      {exact: false}
    )
    const haveLikes = screen.getByText(
      '10',
      {exact: false}
    )

    // ASSERT
    expect(element).toHaveStyle('display: none')
    expect(haveUsername).toBeDefined()
    expect(haveUrl).toBeDefined()
    expect(haveLikes).toBeDefined()
  })

  test('displays url, number of likes when pressing display button', async () => {
    // ARRANGE
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    const element = container.querySelector('.hidden')

    // ACT
    await user.click(viewButton)

    // ASSERT
    expect(element).not.toHaveStyle('display: none')
  })

  test('if like button is clicked twice, the passed handler is called twice', async () => {
    // ARRANGE
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    // const viewButton = screen.getByText('view')
    screen.debug(likeButton)

    // ACT
    // await user.click(viewButton) // <--- display view first?
    await user.click(likeButton)
    await user.click(likeButton)

    // ASSERT
    expect(mockHandler).toBeCalledTimes(2)
  })
})