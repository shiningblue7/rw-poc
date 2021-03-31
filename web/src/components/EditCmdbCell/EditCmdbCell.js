import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import CmdbForm from 'src/components/CmdbForm'

export const QUERY = gql`
  query FIND_CMDB_BY_ID($id: Int!) {
    cmdb: cmdb(id: $id) {
      id
      number
      title
    }
  }
`
const UPDATE_CMDB_MUTATION = gql`
  mutation UpdateCmdbMutation($id: Int!, $input: UpdateCmdbInput!) {
    updateCmdb(id: $id, input: $input) {
      id
      number
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ cmdb }) => {
  const [updateCmdb, { loading, error }] = useMutation(UPDATE_CMDB_MUTATION, {
    onCompleted: () => {
      toast.success('Cmdb updated')
      navigate(routes.cmdbs())
    },
  })

  const onSave = (input, id) => {
    updateCmdb({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Cmdb {cmdb.id}</h2>
      </header>
      <div className="rw-segment-main">
        <CmdbForm cmdb={cmdb} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
