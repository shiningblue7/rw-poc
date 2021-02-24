import Ticket from 'src/components/Ticket'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Ticket not found</div>

export const Success = ({ ticket }) => {
  return <Ticket ticket={ticket} />
}
