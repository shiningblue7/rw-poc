import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import TicketForm from 'src/components/TicketForm'

export const QUERY = gql`
  query FIND_TICKET_BY_ID($id: Int!) {
    ticket: ticket(id: $id) {
      id
      number
      title
      userId
    }
  }
`
const UPDATE_TICKET_MUTATION = gql`
  mutation UpdateTicketMutation($id: Int!, $input: UpdateTicketInput!) {
    updateTicket(id: $id, input: $input) {
      id
      number
      title
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ ticket }) => {
  const { addMessage } = useFlash()
  const [updateTicket, { loading, error }] = useMutation(
    UPDATE_TICKET_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.tickets())
        addMessage('Ticket updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId) })
    updateTicket({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Ticket {ticket.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TicketForm
          ticket={ticket}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
