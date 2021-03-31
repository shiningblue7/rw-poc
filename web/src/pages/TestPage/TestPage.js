import { Link, routes } from '@redwoodjs/router'

const TestPage = () => {
  return (
    <>
      <h1>TestPage</h1>
      <p>
        Find me in <code>./web/src/pages/TestPage/TestPage.js</code>
      </p>
      <p>
        My default route is named <code>test</code>, link to me with `
        <Link to={routes.test()}>Test</Link>`
      </p>
    </>
  )
}

export default TestPage
