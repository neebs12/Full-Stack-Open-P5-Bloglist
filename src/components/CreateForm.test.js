import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CreateForm from './CreateForm'

describe('testing create form', () => {
  test('testing adding blog handler input', async () => {
    // ARRANGE
    // const newBlog = {
    //   title: 'best blog ever',
    //   author: 'jeff green',
    //   url: 'https://www.bestgreen.io'
    // }
    const user = userEvent.setup()
    const mockHandler = jest.fn()

    const { container } = render(<CreateForm addABlog={mockHandler}/>)
    // then, need to get the various inputs
    const titleInput = container.querySelector('.title-input input')
    const authorInput = container.querySelector('.author-input input')
    const urlInput = container.querySelector('.url-input input')
    // then, get the submission button
    const submitButton = screen.getByText('create')
    
    // ACT
    // screen.debug(urlInput) 
    await user.type(titleInput, 'best blog ever')
    // screen.debug(titleInput)
    // <--- see difference here v above
    await user.type(authorInput, 'jeff green')
    await user.type(urlInput, 'https://www.bestgreen.io')
    // <--- fill in the inputs

    await user.click(submitButton)
    // <--- submit the form

    // ASSERT
    expect(mockHandler.mock.calls[0][0]).toBe('best blog ever')
    expect(mockHandler.mock.calls[0][1]).toBe('jeff green')
    expect(mockHandler.mock.calls[0][2]).toBe('https://www.bestgreen.io')
  })
})