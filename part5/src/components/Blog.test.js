import '@testing-library/jest-dom/extend-expect';
import { prettyDOM, render } from '@testing-library/react';
import Blog from './Blog';

test('<blog> title and author but does not render url or likes by default', () => {
    const updateLike = jest.fn()
    const deletePost = jest.fn()

    const blogData = {
        title: 'test title',
        author: 'test author',
        id: 'test id',
        likes: 5,
        url: 'test url'
    }

    const component = render(<Blog blog={blogData} updateLike={updateLike} deletePost={deletePost} />)

    const defaultVisible = component.container.querySelector('.blogDefault')
    const defaultHidden = component.container.querySelector('.hiddenDefault')
    

    expect(defaultVisible).toHaveTextContent(
        'test title test author'
    )
    expect(defaultHidden).toHaveStyle('display : none')
})