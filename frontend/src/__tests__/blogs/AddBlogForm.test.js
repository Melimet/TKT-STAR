import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import AddBlogForm from '../../components/blogs/AddBlogForm'

afterEach(cleanup)

describe('<AddBookForm />', () => {
  it('sends correct data when submitted', async () => {
    const blog = { title: 'Testing Blog', blogger: 'Blogger', url: 'https://example.com' }
    const handleSubmit = jest.fn().mockResolvedValue({ id: 123456789, ...blog })
    const { component, titleInput, bloggerInput, urlInput, submit } = await setup(handleSubmit)

    fireEvent.change(titleInput, { target: { value: blog.title } })
    fireEvent.change(bloggerInput, { target: { value: blog.blogger } })
    fireEvent.change(urlInput, { target: { value: blog.url } })

    await waitForElement(() => component.getByDisplayValue(blog.title))
    await waitForElement(() => component.getByDisplayValue(blog.blogger))
    await waitForElement(() => component.getByDisplayValue(blog.url))

    fireEvent.click(submit)

    expect(handleSubmit).toBeCalledTimes(1)
    expect(handleSubmit).toBeCalledWith(blog)
  })
})

const setup = async handleSubmit => {
  const component = render(<AddBlogForm handleSubmit={handleSubmit} />)
  const titleInput = await component.findByTestId('add-blog-title')
  const bloggerInput = await component.findByTestId('add-blogger')
  const urlInput = await component.findByTestId('add-blog-url')
  const submit = await component.findByTestId('add-blog-submit')

  return {
    component,
    titleInput,
    bloggerInput,
    urlInput,
    submit
  }
}
