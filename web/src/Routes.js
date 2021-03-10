// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Private unauthenticated="home">
        <Route path="/tickets/new" page={NewTicketPage} name="newTicket" />
        <Route path="/tickets/{id:Int}/edit" page={EditTicketPage} name="editTicket" />
        <Route path="/tickets/{id:Int}" page={TicketPage} name="ticket" />
        <Route path="/tickets" page={TicketsPage} name="tickets" />
        <Route path="/users/new" page={NewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={EditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserPage} name="user" />
        <Route path="/users" page={UsersPage} name="users" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
