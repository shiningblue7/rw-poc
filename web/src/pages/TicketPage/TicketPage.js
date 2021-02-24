import TicketsLayout from 'src/layouts/TicketsLayout'
import TicketCell from 'src/components/TicketCell'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const TicketPage = ({ id }) => {
  return (
    <StandardLayout>
    <TicketsLayout>
      <TicketCell id={id} />
    </TicketsLayout>
    </StandardLayout>
  )
}

export default TicketPage
