import { Link, routes } from '@redwoodjs/router'


const HomePage = () => {
  return (<>
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
            <td>taskdoer@jacebenson.onmicrosoft.com</td>
            <td>RWPoc1234</td>
            <td>Task Doer</td>
          </tr>
        </tbody>
      </table>
  </>)
}

export default HomePage
