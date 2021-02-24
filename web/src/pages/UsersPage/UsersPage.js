import UsersLayout from 'src/layouts/UsersLayout'
import UsersCell from 'src/components/UsersCell'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const UsersPage = () => {
  return (
    <StandardLayout>
    <UsersLayout>
      <UsersCell />
    </UsersLayout>
    </StandardLayout>
  )
}

export default UsersPage
