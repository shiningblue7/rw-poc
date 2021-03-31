import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import CmdbForm from 'src/components/CmdbForm'

import { QUERY } from 'src/components/CmdbsCell'

const CREATE_CMDB_MUTATION = gql`
  mutation CreateCmdbMutation($input: CreateCmdbInput!) {
    createCmdb(input: $input) {
      id
    }
  }
`

const NewCmdb = () => {
  const [createCmdb, { loading, error }] = useMutation(CREATE_CMDB_MUTATION, {
    onCompleted: () => {
      toast.success('Cmdb created')
      navigate(routes.cmdbs())
    },
  })

  const onSave = (input) => {
    createCmdb({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Cmdb</h2>
      </header>
      <div className="rw-segment-main">
        <CmdbForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCmdb
