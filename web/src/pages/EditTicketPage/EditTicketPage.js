import TicketsLayout from 'src/layouts/TicketsLayout'
import EditTicketCell from 'src/components/EditTicketCell'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const EditTicketPage = ({ id }) => {
  return (
    <StandardLayout>
    <TicketsLayout>
      <EditTicketCell id={id} />
    </TicketsLayout>
    </StandardLayout>
  )
}

export default EditTicketPage
