import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const StandardLayout = ({ children }) => {
  const { logIn, logOut, isAuthenticated, currentUser, hasRole } = useAuth()
  console.log(currentUser)
  return (
    <>
      <header>
        <h1>
        </h1>
        <nav>
          <Link to={routes.home()}>Tskr.io</Link>
          <ul>
            <li><Link to={routes.about()}>About</Link></li>
            {hasRole(currentUser?.matrix?.ticket?.read) && <li><Link to={routes.tickets()}>Tickets</Link></li>}
            {hasRole(currentUser?.matrix?.asset?.read) && <li><Link to={routes.cmdbs()}>CMDB</Link></li>}
            {hasRole(currentUser?.matrix?.user?.read) && <li><Link to={routes.users()}>Users</Link></li>}
            <li>
              <a alt={JSON.stringify(currentUser)} onClick={isAuthenticated ? logOut : logIn}>
                {isAuthenticated && currentUser && (`Log Out ${currentUser.name}`)}
                {isAuthenticated && !currentUser && (`Log Out`)}
                {!isAuthenticated && `Log In`}
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
