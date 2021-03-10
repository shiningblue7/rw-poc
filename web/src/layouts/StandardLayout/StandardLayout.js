import { Link, Route, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const StandardLayout = ({ children }) => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  return (<>


  <nav>
    <h1>RW-POC</h1>
    <ul>
      <li><Link to={routes.home()}>Home</Link></li>
      <li><Link to={routes.tickets()}>No auth Tickets</Link></li>
      <li><Link to={routes.users()}>No auth Users</Link></li>
      <li><Link to={routes.testPublic()}>Test</Link></li>
      {isAuthenticated && <>
      <li><Link to={routes.listTickets()}>Auth Tickets</Link></li>
      <li><Link to={routes.listUsers()}>Auth Users</Link></li>
      <li><Link to={routes.adminHome()}>Auth Home</Link></li>
      <li><Link to={routes.test()}>Auth Test</Link></li>
      </>
      }
      <li>
        <button onClick={isAuthenticated ? logOut : logIn}>
          <p title={JSON.stringify(currentUser)}>
          {isAuthenticated ? `Log Out ${currentUser.name || currentUser.email}` : 'Log In'}
          </p>
        </button>
      </li>
    </ul>
  </nav>
  <div>
    {children}
  </div>
  </>)
}

export default StandardLayout

/**
 *   <style
      dangerouslySetInnerHTML={{
        __html: `
              html, body {
                margin: 0;
              }
              html * {
                box-sizing: border-box;
              }
              nav > * {
                display:inline;
              }
              nav > ul {
                float: right;
              }
              nav > ul > li {
                display: inline;
                padding: 1rem;
              }
              main {
                display: flex;
                align-items: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                text-align: left;
                background-color: #E2E8F0;
                height: 100vh;
              }
              section {
                background-color: white;
                border-radius: 0.25rem;
                width: 32rem;
                padding: 1rem;
                margin: 0 auto;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
              }
              h1 {
                font-size: 2rem;
                margin: 0;
                font-weight: 500;
                line-height: 1;
                color: #2D3748;
              }
            `,
      }}
    />
 */