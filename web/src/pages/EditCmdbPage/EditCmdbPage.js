import CmdbsLayout from 'src/layouts/CmdbsLayout'
import EditCmdbCell from 'src/components/EditCmdbCell'
import StandardLayout from 'src/layouts/StandardLayout'


const EditCmdbPage = ({ id }) => {
  return (
    <>
    <CmdbsLayout>
      <EditCmdbCell id={id} />
    </CmdbsLayout>
    </>
  )
}

export default EditCmdbPage
