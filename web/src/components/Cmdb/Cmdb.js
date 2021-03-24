import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/CmdbsCell'

const DELETE_CMDB_MUTATION = gql`
  mutation DeleteCmdbMutation($id: Int!) {
    deleteCmdb(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Cmdb = ({ cmdb }) => {
  const [deleteCmdb] = useMutation(DELETE_CMDB_MUTATION, {
    onCompleted: () => {
      toast.success('Cmdb deleted')
      navigate(routes.cmdbs())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete cmdb ' + id + '?')) {
      deleteCmdb({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Cmdb {cmdb.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{cmdb.id}</td>
            </tr>
            <tr>
              <th>Number</th>
              <td>{cmdb.number}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{cmdb.title}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCmdb({ id: cmdb.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(cmdb.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Cmdb
