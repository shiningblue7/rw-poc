export const schema = gql`
  type TicketNote {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    field: String!
    value: String!
    Ticket: Ticket!
    ticketId: Int!
    User: User!
    userId: Int!
  }

  type Query {
    ticketNotes: [TicketNote!]!
  }

  input CreateTicketNoteInput {
    field: String!
    value: String!
    ticketId: Int!
    userId: Int!
  }

  input UpdateTicketNoteInput {
    field: String
    value: String
    ticketId: Int
    userId: Int
  }
`
