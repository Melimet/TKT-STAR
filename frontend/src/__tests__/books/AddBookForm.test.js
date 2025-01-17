import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import AddBookForm from '../../components/books/AddBookForm'

afterEach(cleanup)

describe('<AddBookForm />', () => {
  it('sends correct data when submitted', async () => {
    const book = { title: 'Book Title', author: 'Author', isbn: '1234-4321' }
    const handleSubmit = jest.fn().mockResolvedValue(book)
    const { component, authorInput, titleInput, isbnInput, submit } = await setup(handleSubmit)

    fireEvent.change(authorInput, { target: { value: book.author } })
    fireEvent.change(titleInput, { target: { value: book.title } })
    fireEvent.change(isbnInput, { target: { value: book.isbn } })

    await waitForElement(() => component.getByDisplayValue(book.author))
    await waitForElement(() => component.getByDisplayValue(book.title))
    await waitForElement(() => component.getByDisplayValue(book.isbn))

    fireEvent.click(submit)

    expect(handleSubmit).toBeCalledTimes(1)
    expect(handleSubmit).toBeCalledWith(book)
  })
})

const setup = async handleSubmit => {
  const component = render(<AddBookForm handleSubmit={handleSubmit} />)
  const authorInput = await component.findByTestId('add-book-author')
  const titleInput = await component.findByTestId('add-book-title')
  const isbnInput = await component.findByTestId('add-book-isbn')
  const submit = await component.findByTestId('add-book-submit')
  return {
    component,
    authorInput,
    titleInput,
    isbnInput,
    submit
  }
}
