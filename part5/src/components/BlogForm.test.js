import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import BlogForm from './BlogForm';

test('Blogform prop details check', () => {
    const createBlog = jest.fn()
    const component = render(<BlogForm createBlog={createBlog}/>)
    
    const authorInput = component.container.querySelector('#inputAuthor')
    const urlInput = component.container.querySelector('#inputUrl')
    const titleInput = component.container.querySelector('#inputTitle')
    const submitForm = component.getByText('create')


    fireEvent.change(authorInput, {
        target: {
        value: 'test author'
    }})
    fireEvent.change(urlInput, {
        target: {
        value: 'test URL'
    }})
    fireEvent.change(titleInput, {
        target: {
        value: 'test title'
        }
    })
    
    fireEvent.submit(submitForm)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('test URL')
})