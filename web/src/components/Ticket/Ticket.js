import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { QUERY } from 'src/components/TicketsCell'

const DELETE_TICKET_MUTATION = gql`
  mutation DeleteTicketMutation($id: Int!) {
    deleteTicket(id: $id) {
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

const propercase = (text) => {
  text = text.toLowerCase().split(' ');
  for (var i = 0; i < text.length; i++) {
    text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1);
  }
  return text.join(' ');
}
const Ticket = ({ ticket }) => {
  const { addMessage } = useFlash()
  const [deleteTicket] = useMutation(DELETE_TICKET_MUTATION, {
    onCompleted: () => {
      navigate(routes.tickets())
      addMessage('Ticket deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ticket ' + id + '?')) {
      deleteTicket({ variables: { id } })
    }
  }
  const { logIn, logOut, isAuthenticated, currentUser, hasRole } = useAuth()
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Ticket {ticket.number} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Number</th>
              <td>{ticket.number}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{ticket.title}</td>
            </tr>
            <tr>
              <th>Impact</th>
              <td>{propercase(ticket.impact)}</td>
            </tr>
            <tr>
              <th>Urgency</th>
              <td>{propercase(ticket.urgency)}</td>
            </tr>
            <tr>
              <th>Priority</th>
              <td>{propercase(ticket.priority)}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{ticket.title}</td>
            </tr>
            <tr>
              <th>Assigned To</th>
              <td>{ticket.User.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        {hasRole(currentUser?.matrix?.ticket?.update) &&
          <Link
            to={routes.editTicket({ id: ticket.id })}
            className="rw-button rw-button-blue"
          >
            Edit
        </Link>
        }
        {hasRole(currentUser?.matrix?.ticket?.delete) &&
          <a
            href="#"
            className="rw-button rw-button-red"
            onClick={() => onDeleteClick(ticket.id)}
          >
            Delete
        </a>
        }
      </nav>
    </>
  )
}

export default Ticket
