import { useAuth } from "@redwoodjs/auth";
import { Router, Route, Private, Set } from '@redwoodjs/router'
import StandardLayout from './layouts/StandardLayout/StandardLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={StandardLayout}>
        <Private unauthenticated="login">

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

      <Private unauthenticated="home" role="admin" >
        <Route path="/posts" page={PostsPage} name="posts" />
      </Private>
      <Route path="/contact" page={ContactPage} name="contact" />
      <Route path="/blog-post/{id:Int}" page={BlogPostPage} name="blogPost" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/login" page={AboutPage} name="login" />

      <Route path="/" page={HomePage} name="home" />

      <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
