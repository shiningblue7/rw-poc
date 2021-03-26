import { Link, routes } from '@redwoodjs/router'

import Cmdbs from 'src/components/Cmdbs'

export const QUERY = gql`
  query CMDBS {
    cmdbs {
      id
      number
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No cmdbs yet. '}
      <Link to={routes.newCmdb()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ cmdbs }) => {
  return <Cmdbs cmdbs={cmdbs} />
}
