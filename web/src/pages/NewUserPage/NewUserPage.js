import UsersLayout from 'src/layouts/UsersLayout'
import NewUser from 'src/components/NewUser'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const NewUserPage = () => {
  return (
    <StandardLayout>
    <UsersLayout>
      <NewUser />
    </UsersLayout>
    </StandardLayout>
  )
}

export default NewUserPage
