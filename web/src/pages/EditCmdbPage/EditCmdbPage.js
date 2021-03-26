import CmdbsLayout from 'src/layouts/CmdbsLayout'
import EditCmdbCell from 'src/components/EditCmdbCell'
import StandardLayout from 'src/layouts/StandardLayout'


const EditCmdbPage = ({ id }) => {
  return (
    <StandardLayout>
    <CmdbsLayout>
      <EditCmdbCell id={id} />
    </CmdbsLayout>
    </StandardLayout>
  )
}

export default EditCmdbPage
