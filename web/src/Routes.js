import { Router, Route, Private, Set } from '@redwoodjs/router'
import StandardLayout from './layouts/StandardLayout/StandardLayout'
import { useAuth } from '@redwoodjs/auth'


const Routes = () => {
  const { hasRole, currentUser } = useAuth()
  return (
    <Router>
      <Set wrap={StandardLayout}>
        <Private unauthenticated="home">

        <Private unauthenticated="about" role={currentUser?.matrix?.asset?.create} >
          <Route path="/cmdbs/new" page={NewCmdbPage} name="newCmdb" />
        </Private>
        <Private unauthenticated="about" role={currentUser?.matrix?.asset?.update} >
          <Route path="/cmdbs/{id:Int}/edit" page={EditCmdbPage} name="editCmdb" />
        </Private>
        <Private unauthenticated="about" role={currentUser?.matrix?.asset?.read} >
          <Route path="/cmdbs/{id:Int}" page={CmdbPage} name="cmdb" />
          <Route path="/cmdbs" page={CmdbsPage} name="cmdbs" />
        </Private>

        <Private unauthenticated="about" role={currentUser?.matrix?.ticket?.create} >
          <Route path="/tickets/new" page={NewTicketPage} name="newTicket" />
          </Private>
        <Private unauthenticated="about" role={currentUser?.matrix?.ticket?.update} >
          <Route path="/tickets/{id:Int}/edit" page={EditTicketPage} name="editTicket" />
          </Private>
          <Private unauthenticated="about" role={currentUser?.matrix?.ticket?.read} >
          <Route path="/tickets/{id:Int}" page={TicketPage} name="ticket" />
          <Route path="/tickets" page={TicketsPage} name="tickets" />
        </Private>

        <Private unauthenticated="about" role={currentUser?.matrix?.user?.create} >
          <Route path="/users/new" page={NewUserPage} name="newUser" />
        </Private>
        <Private unauthenticated="about" role={currentUser?.matrix?.user?.update} >
          <Route path="/users/{id:Int}/edit" page={EditUserPage} name="editUser" />
        </Private>
        <Private unauthenticated="about" role={currentUser?.matrix?.user?.read} >
          <Route path="/users/{id:Int}" page={UserPage} name="user" />
          <Route path="/users" page={UsersPage} name="users" />
        </Private>

        <Private unauthenticated="home" role="admin" >
          <Route path="/posts" page={PostsPage} name="posts" />
          <Route path="/admin/posts/new" page={NewPostPage} name="newPost" />
          <Route path="/admin/posts/{id:Int}/edit" page={EditPostPage} name="editPost" />
          <Route path="/admin/posts/{id:Int}" page={PostPage} name="post" />
          <Route path="/contact" page={ContactPage} name="contact" />
          <Route path="/blog-post/{id:Int}" page={BlogPostPage} name="blogPost" />
        </Private>
      </Private>

      <Route path="/about" page={AboutPage} name="about" prerender />
      <Route path="/" page={HomePage} name="home" prerender />
      <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
