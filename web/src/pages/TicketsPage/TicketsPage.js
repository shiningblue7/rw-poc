import TicketsLayout from 'src/layouts/TicketsLayout'
import TicketsCell from 'src/components/TicketsCell'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const TicketsPage = () => {
  return (
    <StandardLayout>
    <TicketsLayout>
      <TicketsCell />
    </TicketsLayout>
    </StandardLayout>
  )
}

export default TicketsPage
