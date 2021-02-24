import UsersLayout from 'src/layouts/UsersLayout'
import EditUserCell from 'src/components/EditUserCell'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const EditUserPage = ({ id }) => {
  return (
    <StandardLayout>
    <UsersLayout>
      <EditUserCell id={id} />
    </UsersLayout>
    </StandardLayout>
  )
}

export default EditUserPage
