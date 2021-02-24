import {
  tickets,
  ticket,
  createTicket,
  updateTicket,
  deleteTicket,
} from './tickets'

describe('tickets', () => {
  scenario('returns all tickets', async (scenario) => {
    const result = await tickets()

    expect(result.length).toEqual(Object.keys(scenario.ticket).length)
  })

  scenario('returns a single ticket', async (scenario) => {
    const result = await ticket({ id: scenario.ticket.one.id })

    expect(result).toEqual(scenario.ticket.one)
  })

  scenario('creates a ticket', async (scenario) => {
    const result = await createTicket({
      input: { number: 'String2626472' },
    })

    expect(result.number).toEqual('String2626472')
  })

  scenario('updates a ticket', async (scenario) => {
    const original = await ticket({ id: scenario.ticket.one.id })
    const result = await updateTicket({
      id: original.id,
      input: { number: 'String83903662' },
    })

    expect(result.number).toEqual('String83903662')
  })

  scenario('deletes a ticket', async (scenario) => {
    const original = await deleteTicket({ id: scenario.ticket.one.id })
    const result = await ticket({ id: original.id })

    expect(result).toEqual(null)
  })
})
