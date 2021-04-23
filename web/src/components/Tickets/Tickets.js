import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/TicketsCell'
import { useAuth } from '@redwoodjs/auth'
const DELETE_TICKET_MUTATION = gql`
  mutation DeleteTicketMutation($id: Int!) {
    deleteTicket(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const propercase = (text) =>{
  text = text.toLowerCase().split(' ');
  for (var i = 0; i < text.length; i++) {
    text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1);
  }
  return text.join(' ');
}

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

const TicketsList = ({ tickets }) => {
  const { addMessage } = useFlash()
  const [deleteTicket] = useMutation(DELETE_TICKET_MUTATION, {
    onCompleted: () => {
      addMessage('Ticket deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ticket ' + id + '?')) {
      deleteTicket({ variables: { id } })
    }
  }

  const { logIn, logOut, isAuthenticated, currentUser, hasRole } = useAuth()
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>State</th>
            <th>Title</th>
            <th>User</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{truncate(ticket.number)}</td>
              <td>{propercase(ticket.state)}</td>
              <td>{truncate(ticket.title)}</td>
              <td>
                {ticket.userId && (
                  <div title={truncate(ticket.userId)}>
                  {truncate(ticket.User.name)}
                </div>
                )}
                {!ticket.userId && (
                  <div title=""></div>
                )}
              </td>
              <td>
                <nav className="rw-table-actions">
                {hasRole(currentUser?.matrix?.user?.read) &&
                  <Link
                    to={routes.ticket({ id: ticket.id })}
                    title={'Show ticket ' + ticket.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
}
{hasRole(currentUser?.matrix?.user?.update) &&
                  <Link
                    to={routes.editTicket({ id: ticket.id })}
                    title={'Edit ticket ' + ticket.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
}
{hasRole(currentUser?.matrix?.user?.delete) &&
                  <a
                    href="#"
                    title={'Delete ticket ' + ticket.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ticket.id)}
                  >
                    Delete
                  </a>
}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TicketsList
