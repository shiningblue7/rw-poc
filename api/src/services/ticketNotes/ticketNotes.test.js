import { ticketNotes } from './ticketNotes'

describe('ticketNotes', () => {
  scenario('returns all ticketNotes', async (scenario) => {
    const result = await ticketNotes()

    expect(result.length).toEqual(Object.keys(scenario.ticketNote).length)
  })
})
