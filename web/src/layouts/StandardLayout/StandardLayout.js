import { Link, Route, routes } from '@redwoodjs/router'

const StandardLayout = ({ children }) => {
  return (<>
  <style
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
