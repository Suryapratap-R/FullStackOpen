describe('blog', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')

        const user = {
                username: 'username',
                name: 'suryapratap',
                password: 'password'
            }

        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function () {
        cy.contains('Username')
        cy.contains('Password')
        cy.get('button').contains('Login')
    })

    describe('Login', function () {
        it('fails with wrong credentials', function () {
            cy.get('#login-username').type('username')
            cy.get('#login-password').type('wrong')
            cy.get('button').contains('Login').click()
            cy.get('html').should('not.contain', 'suryapratap logged in')
        })

        it('succeeds with correct credentials', function () {
            cy.get('#login-username').type('username')
            cy.get('#login-password').type('password')
            cy.get('button').contains('Login').click()

            cy.get('html').should('contain', 'suryapratap logged in')
        })

        describe('when logged in', function () {
            beforeEach(function () {
                const user = {
                username: 'username',
                password: 'password'
            }
                cy.request('POST', 'http://localhost:3003/api/login', user).then(response => {
                    localStorage.setItem('user', JSON.stringify(response.body))
                    cy.visit('http://localhost:3000')
                })
            })
            it('A blog can be created', function () {
                cy.get('button').contains('create new blog').click()
                cy.get('#inputTitle').type('new title cypress')
                cy.get('#inputAuthor').type('new author cypress')
                cy.get('#inputUrl').type('new url cypress')

                cy.get('#create-blog').click()

                cy.get('html').contains('added')
            })

            describe('a several blog post exists', function () {
                beforeEach(function () {
                    cy.addBlog('new title cypress', 'author cypress', 'url/1 cypress')
                    cy.addBlog('title with 3 likes', 'author cypress', 'url/3 cypress')
                    cy.addBlog('title with 2 likes', 'author cypress', 'url/2 cypress')
                    cy.addBlog('title with 0 likes', 'author cypress', 'url/0 cypress')
                })

                it('blog can be liked', function () {
                    cy.get('.blog').contains('new title cypress').get('button').contains('show').click()
                    cy.get('.blog-likes').contains('likes 0')
                    cy.get('.blog button').contains('like').click()
                    cy.get('.blog-likes').contains('likes 1')
                    cy.get('.blog button').contains('like').click()
                    cy.get('.blog-likes').contains('likes 2')
                })
                it('blog can be deleted', function () {
                    cy.get('.blog').contains('new title cypress')
                    cy.get('.blog button').contains('show').click()
                    cy.get('.blog button').contains('remove').click()
                    cy.get('html').should('not.contain','new title cypress')
                })

                it.only('blogs are sorted according to likes', function () {
                    cy.likePost('title with 3 likes')
                    cy.likePost('title with 3 likes')
                    cy.likePost('title with 3 likes')
                    
                    cy.likePost('title with 2 likes')
                    cy.likePost('title with 2 likes')

                    cy.likePost('new title cypress')


                    cy.get('.blog').first().contains('title with 3 likes')
                })
            })

        })

    })
})