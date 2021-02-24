import { Link, routes } from '@redwoodjs/router'

import Tickets from 'src/components/Tickets'

export const QUERY = gql`
  query TICKETS {
    tickets {
      id
      number
      title
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tickets yet. '}
      <Link to={routes.newTicket()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ tickets }) => {
  return <Tickets tickets={tickets} />
}
