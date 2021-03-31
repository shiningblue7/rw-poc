import Cmdb from 'src/components/Cmdb'

export const QUERY = gql`
  query FIND_CMDB_BY_ID($id: Int!) {
    cmdb: cmdb(id: $id) {
      id
      number
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Cmdb not found</div>

export const Success = ({ cmdb }) => {
  return <Cmdb cmdb={cmdb} />
}
