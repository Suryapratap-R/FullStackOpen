import { React, useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }
    const handleCreateNew = async (event) => {
        event.preventDefault()
        
        createBlog({ title, author, url })

        setTitle('')
        setAuthor('')
        setUrl('')
        
    }

    return (
        <div>
        <h2>create new</h2>
        
        <form onSubmit={handleCreateNew}>
            <div>
            title:<input id='inputTitle' value={title} onChange={handleTitleChange}/>
            </div>
            <div>
            author:<input id='inputAuthor' value={author} onChange={handleAuthorChange}/>
            </div>
            <div>
            url:<input id='inputUrl' value={url} onChange={handleUrlChange}/>
            </div>
            <button type='inputSubmit'>create</button>
        </form>
    </div>
    )
}

export default BlogForm