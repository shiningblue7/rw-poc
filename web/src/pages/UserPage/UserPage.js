import UsersLayout from 'src/layouts/UsersLayout'
import UserCell from 'src/components/UserCell'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const UserPage = ({ id }) => {
  return (
    <StandardLayout>
    <UsersLayout>
      <UserCell id={id} />
    </UsersLayout>
    </StandardLayout>
  )
}

export default UserPage
