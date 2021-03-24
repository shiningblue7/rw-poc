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
      <Private unauthenticated="home">
        <Route path="/cmdbs/new" page={NewCmdbPage} name="newCmdb" />
        <Route path="/cmdbs/{id:Int}/edit" page={EditCmdbPage} name="editCmdb" />
        <Route path="/cmdbs/{id:Int}" page={CmdbPage} name="cmdb" />
        <Route path="/cmdbs" page={CmdbsPage} name="cmdbs" />
        <Route path="/tickets/new" page={NewTicketPage} name="newTicket" />
        <Route path="/tickets/{id:Int}/edit" page={EditTicketPage} name="editTicket" />
        <Route path="/tickets/{id:Int}" page={TicketPage} name="ticket" />
        <Route path="/tickets" page={TicketsPage} name="tickets" />
        <Route path="/users/new" page={NewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={EditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserPage} name="user" />
        <Route path="/users" page={UsersPage} name="users" />
        <Route path="/admin/posts/new" page={NewPostPage} name="newPost" />
        <Route path="/admin/posts/{id:Int}/edit" page={EditPostPage} name="editPost" />
        <Route path="/admin/posts/{id:Int}" page={PostPage} name="post" />

      </Private>
      <Route path="/posts" page={PostsPage} name="posts" />
      <Route path="/contact" page={ContactPage} name="contact" />
      <Route path="/blog-post/{id:Int}" page={BlogPostPage} name="blogPost" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
