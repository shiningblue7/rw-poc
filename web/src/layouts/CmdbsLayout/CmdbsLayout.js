import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const CmdbsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.cmdbs()} className="rw-link">
            Cmdbs
          </Link>
        </h1>
        <Link to={routes.newCmdb()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Cmdb
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default CmdbsLayout
