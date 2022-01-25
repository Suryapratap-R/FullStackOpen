import '@testing-library/jest-dom/extend-expect';
import { fireEvent, prettyDOM, render } from '@testing-library/react';
import Blog from './Blog';


describe('<blog> ', () => {

    let component

    beforeEach(() => {
        const updateLike = jest.fn()
        const deletePost = jest.fn()

        const blogData = {
            title: 'test title',
            author: 'test author',
            id: 'test id',
            likes: 5,
            url: 'test url'
        }

        component = render(<Blog blog={blogData} updateLike={updateLike} deletePost={deletePost} />)
    })

    test('title and author but does not render url or likes by default', () => {
        const defaultVisible = component.container.querySelector('.blogDefault')
        const defaultHidden = component.container.querySelector('.hiddenDefault')
        
        expect(defaultVisible).toHaveTextContent(
            'test title test author'
        )
        expect(defaultHidden).toHaveStyle('display : none')
    })

    test('blog url and likes are shown when button is clicked', () => {
        const showButton = component.getByText('show')
        fireEvent.click(showButton)
        const defaultHidden = component.container.querySelector('.hiddenDefault')
        expect(defaultHidden).not.toHaveStyle('display : none')
    })
})
