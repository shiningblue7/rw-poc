import CmdbsLayout from 'src/layouts/CmdbsLayout'
import CmdbCell from 'src/components/CmdbCell'

const CmdbPage = ({ id }) => {
  return (
    <>
    <CmdbsLayout>
      <CmdbCell id={id} />
    </CmdbsLayout>
    </>
  )
}

export default CmdbPage
