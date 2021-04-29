import { Link, routes } from '@redwoodjs/router'
import { SelectField, Label, FieldError } from '@redwoodjs/forms'
import Users from 'src/components/Users'

export const QUERY = gql`
  query USERS {
    users {
      id
      name
    }
  }
`

export const Failure = () => <div>
  <FieldError name="userId" className="rw-field-error" />
</div>

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
    </div>
  )
}

export const Success = ({ defaultValue, users }) => {
  //return <Users users={users} />
  var options = users.map((user)=>{
        return <option key={user.id} value={user.id}>{user['name']}</option>
      })
  return (<>
        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Assigned to
        </Label>

        <SelectField
          name="userId"
          defaultValue={defaultValue}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          <option value="">Pick One</option>
          {options}
        </SelectField>
    </>
  )
}
