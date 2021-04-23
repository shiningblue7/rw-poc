import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  SelectField,
  Submit,
} from '@redwoodjs/forms'
import UserLookupCell from 'src/components/UserLookupCell'
import { useAuth } from '@redwoodjs/auth'

const TicketForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.ticket?.id)
  }
  const { hasRole, currentUser } = useAuth()
  const canWrite = () => {
    //if ticket is not passed, new record.
    if(typeof props.ticket === 'undefined'){
      return true;
    }
    //if ticket state is solved... require task_admin or admin
    if(props?.ticket?.state === 'solved'){
      if(hasRole('task_admin') || hasRole('admin')){
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  console.log(`canWrite ${canWrite()}`)
  console.log('currentUser', currentUser)
  //console.log(rulesMatrix);
  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
      <fieldset disabled={canWrite()===false}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >Title</Label>
        <TextField
          name="title"
          defaultValue={props.ticket?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          autoComplete="off"
        />
        <FieldError name="title" className="rw-field-error" />

        <Label
          name="state"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          STATE
        </Label>
        <SelectField
          name="state"
          className="rw-input"
          validation={{ required: true }}
          defaultValue={props.ticket?.state}
        >
          <option value="new">New</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="onhold">On hold</option>
          <option value="solved">Solved</option>
        </SelectField>
        <FieldError name="state" className="rw-field-error" />
        <Label
          name="impact"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Impact
        </Label>
        <SelectField
          name="impact"
          className="rw-input"
          validation={{ required: true }}
          defaultValue={props.ticket?.impact}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </SelectField>
        <FieldError name="impact" className="rw-field-error" />

        <Label
          name="urgency"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Urgency
        </Label>
        <SelectField
          name="urgency"
          className="rw-input"
          validation={{ required: true }}
          defaultValue={props.ticket?.urgency}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </SelectField>
        <FieldError name="impact" className="rw-field-error" />
        <Label
          name="priority"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Priority
        </Label>
        <SelectField
          name="priority"
          className="rw-input"
          validation={{ required: true }}
          defaultValue={props.ticket?.priority}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </SelectField>
        <FieldError name="impact" className="rw-field-error" />

        <UserLookupCell defaultValue={props.ticket?.userId} />
        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>

        </fieldset>
      </Form>
    </div>
  )
}

export default TicketForm
