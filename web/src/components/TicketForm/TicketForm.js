import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  SelectField,
  Submit,
} from '@redwoodjs/forms'
import UserLookupCell from 'src/components/UserLookupCell'

const TicketForm = (props) => {
  console.log(props)
  const onSubmit = (data) => {
    props.onSave(data, props?.ticket?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
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
          IMPACT
        </Label>
        <SelectField
          name="impact"
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
          URGENCY
        </Label>
        <SelectField
          name="urgency"
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
          PRIORITY
        </Label>
        <SelectField
          name="priority"
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
      </Form>
    </div>
  )
}

export default TicketForm
