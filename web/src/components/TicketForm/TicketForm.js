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
        >
          Title
        </Label>
        <TextField
          name="title"
          defaultValue={props.ticket?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          autoComplete="off"
        />
        <FieldError name="title" className="rw-field-error" />

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
