import { Link, routes } from '@redwoodjs/router'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const HomePage = () => {
  return (<StandardLayout>
      This is home

      <h2>Logins</h2>
      <table>
        <thead>
          <tr>
            <td>Email</td>
            <td>Password</td>
            <td>Persona</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ssunpkyfgylsrumhuw@upived.online</td>
            <td>rwpoc</td>
            <td>User</td>
          </tr>
        </tbody>
      </table>
  </StandardLayout>)
}

export default HomePage
