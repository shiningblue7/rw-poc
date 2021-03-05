export const schema = gql`
  type Ticket {
    id: Int!
    number: String
    title: String
    User: User
    userId: Int
  }

  type Query {
    tickets: [Ticket!]!
    ticket(id: Int!): Ticket
  }

  input CreateTicketInput {
    number: String
    title: String
    userId: Int
  }

  input UpdateTicketInput {
    number: String
    title: String
    userId: Int
  }

  type Mutation {
    createTicket(input: CreateTicketInput!): Ticket!
    updateTicket(id: Int!, input: UpdateTicketInput!): Ticket!
    deleteTicket(id: Int!): Ticket!
  }
`
