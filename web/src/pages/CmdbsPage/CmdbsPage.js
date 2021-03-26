import CmdbsLayout from 'src/layouts/CmdbsLayout'
import CmdbsCell from 'src/components/CmdbsCell'
import StandardLayout from 'src/layouts/StandardLayout'
const CmdbsPage = () => {
  return (
    <StandardLayout>
    <CmdbsLayout>
      <CmdbsCell />
    </CmdbsLayout>
    </StandardLayout>
  )
}

export default CmdbsPage
