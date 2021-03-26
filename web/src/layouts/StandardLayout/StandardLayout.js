import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const StandardLayout = ({ children }) => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <header>
        <h1>

        </h1>
        <nav>
          <Link to={routes.home()}>RW POC</Link>
          <ul>

            <li><Link to={routes.about()}>About</Link></li>
            {isAuthenticated && <li><Link to={routes.tickets()}>Tickets</Link></li>}
            {isAuthenticated && <li><Link to={routes.cmdbs()}>CMDB</Link></li>}
            {isAuthenticated && <li><Link to={routes.users()}>Users</Link></li>}
            <li>
              <a alt={currentUser} onClick={isAuthenticated ? logOut : logIn}>
                {isAuthenticated ? `Log Out ${currentUser.user_metadata.full_name}` : 'Log In'}
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <article>
          {children}
        </article>
      </main>
    </>
  )
}

export default StandardLayout
