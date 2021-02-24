import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

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

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Ticket {ticket.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ticket.id}</td>
            </tr>
            <tr>
              <th>Number</th>
              <td>{ticket.number}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{ticket.title}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{ticket.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTicket({ id: ticket.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ticket.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Ticket
