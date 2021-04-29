import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { QUERY } from 'src/components/CmdbsCell'

const DELETE_CMDB_MUTATION = gql`
  mutation DeleteCmdbMutation($id: Int!) {
    deleteCmdb(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const CmdbsList = ({ cmdbs }) => {
  const [deleteCmdb] = useMutation(DELETE_CMDB_MUTATION, {
    onCompleted: () => {
      toast.success('Cmdb deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete cmdb ' + id + '?')) {
      deleteCmdb({ variables: { id } })
    }
  }

  const { logIn, logOut, isAuthenticated, currentUser, hasRole } = useAuth()
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Number</th>
            <th>Title</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {cmdbs.map((cmdb) => (
            <tr key={cmdb.id}>
              <td>{truncate(cmdb.id)}</td>
              <td>{truncate(cmdb.number)}</td>
              <td>{truncate(cmdb.title)}</td>
              <td>
                <nav className="rw-table-actions">

            {hasRole(currentUser?.matrix?.asset?.read) &&
                  <Link
                    to={routes.cmdb({ id: cmdb.id })}
                    title={'Show cmdb ' + cmdb.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
}
            {hasRole(currentUser?.matrix?.asset?.update) &&
                  <Link
                    to={routes.editCmdb({ id: cmdb.id })}
                    title={'Edit cmdb ' + cmdb.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>}

            {hasRole(currentUser?.matrix?.asset?.delete) &&
                  <a
                    href="#"
                    title={'Delete cmdb ' + cmdb.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(cmdb.id)}
                  >
                    Delete
                  </a>}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CmdbsList
