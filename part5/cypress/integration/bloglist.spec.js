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
            it.only('A blog can be created', function () {
                cy.get('button').contains('create new blog').click()
                cy.get('#inputTitle').type('new title cypress')
                cy.get('#inputAuthor').type('new author cypress')
                cy.get('#inputUrl').type('new url cypress')

                cy.get('#create-blog').click()

                cy.get('html').contains('added')
            })
        })

    })
})