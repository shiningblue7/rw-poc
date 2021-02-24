import TicketsLayout from 'src/layouts/TicketsLayout'
import NewTicket from 'src/components/NewTicket'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const NewTicketPage = () => {
  return (
    <StandardLayout>
    <TicketsLayout>
      <NewTicket />
    </TicketsLayout>
    </StandardLayout>
  )
}

export default NewTicketPage
