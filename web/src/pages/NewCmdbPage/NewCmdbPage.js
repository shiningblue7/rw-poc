import CmdbsLayout from 'src/layouts/CmdbsLayout'
import NewCmdb from 'src/components/NewCmdb'
import StandardLayout from 'src/layouts/StandardLayout'
const NewCmdbPage = () => {
  return (
    <StandardLayout>
    <CmdbsLayout>
      <NewCmdb />
    </CmdbsLayout>
    </StandardLayout>
  )
}

export default NewCmdbPage
