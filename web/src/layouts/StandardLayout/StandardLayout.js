import { Link, Route, routes } from '@redwoodjs/router'
import {useAuth} from '@redwoodjs/auth'

const StandardLayout = ({ children }) => {
  const { logIn, logOut, isAuthenticated } = useAuth()
  return (<>
  <nav>
    <h1>RW-POC</h1>
    <ul>
    <li><Link to={routes.home()}>Home</Link></li>
    <li><Link to={routes.tickets()}>Tickets</Link></li>
    <li><Link to={routes.users()}>Users</Link></li>
    </ul>
  </nav>
  <div>
    {children}
  </div>
  </>)
}

export default StandardLayout