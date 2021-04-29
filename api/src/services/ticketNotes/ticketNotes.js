import { db } from 'src/lib/db'

export const ticketNotes = () => {
  return db.ticketNote.findMany()
}

export const TicketNote = {
  Ticket: (_obj, { root }) =>
    db.ticketNote.findUnique({ where: { id: root.id } }).Ticket(),
  User: (_obj, { root }) =>
    db.ticketNote.findUnique({ where: { id: root.id } }).User(),
}
