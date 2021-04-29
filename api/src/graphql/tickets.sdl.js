export const schema = gql`
  type Ticket {
    id: Int!
    number: String
    title: String
    User: User
    userId: Int
    state: String
    impact: String
    urgency: String
    priority: String
  }

  type Query {
    tickets: [Ticket!]!
    ticket(id: Int!): Ticket
  }

  input CreateTicketInput {
    number: String
    title: String
    userId: Int
    state: String
    impact: String
    urgency: String
    priority: String
  }

  input UpdateTicketInput {
    number: String
    title: String
    userId: Int
    state: String
    impact: String
    urgency: String
    priority: String
  }

  input UpdateTicketWithNotesInput {
    number: String
    title: String
    userId: Int
    state: String
    impact: String
    urgency: String
    priority: String
    notes: String
  }

  type Mutation {
    createTicket(input: CreateTicketInput!): Ticket!
    updateTicket(id: Int!, input: UpdateTicketInput!): Ticket!
    UpdateTicketWithNotes(id: Int!, input: UpdateTicketWithNotesInput!): Ticket!
    deleteTicket(id: Int!): Ticket!
  }
`
