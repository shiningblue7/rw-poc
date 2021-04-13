import { Link, routes } from '@redwoodjs/router'


const HomePage = () => {
  return (<>
      This is home

      <h2>Logins</h2>
      <table>
        <thead>
          <tr>
            <td>Persona</td>
            <td>Name</td>
            <td>Email</td>
            <td>Password</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Task Doer</td>
            <td>Tom Doer Tillamook</td>
            <td>demotaskdoer@tskr.io</td>
            <td>Task0001</td>
          </tr>
          <tr>
            <td>Task Admin</td>
            <td>Tory Admin Taylor</td>
            <td>demotaskadmin@tskr.io</td>
            <td>Task0002</td>
          </tr>
          <tr>
            <td>Asset Doer</td>
            <td>Adam Doer Anderson</td>
            <td>demoassetdoer@tskr.io</td>
            <td>Task0003</td>
          </tr>
          <tr>
            <td>Asset Admin</td>
            <td>Anna Admin Abbott</td>
            <td>demoassetadmin@tskr.io</td>
            <td>Task0004</td>
          </tr>
          <tr>
            <td>Admin</td>
            <td>Ali Admin Armstrong</td>
            <td>demoadmin@tskr.io</td>
            <td>Task0005</td>
          </tr>
        </tbody>
      </table>
  </>)
}

export default HomePage
