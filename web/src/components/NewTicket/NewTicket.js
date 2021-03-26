import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import TicketForm from 'src/components/TicketForm'

import { QUERY } from 'src/components/TicketsCell'

const CREATE_TICKET_MUTATION = gql`
  mutation CreateTicketMutation($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
    }
  }
`

const NewTicket = () => {
  const { addMessage } = useFlash()
  const [createTicket, { loading, error }] = useMutation(
    CREATE_TICKET_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.tickets())
        addMessage('Ticket created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId) })
    createTicket({ variables: { input: castInput } })
  }
var rand = Math.random()
  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Ticket</h2>
      </header>
      <div className="rw-segment-main">
        <TicketForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTicket
