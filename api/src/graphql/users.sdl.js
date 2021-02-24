export const schema = gql`
  type User {
    id: Int!
    userName: String!
    email: String!
    name: String!
    Ticket: [Ticket]!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  input CreateUserInput {
    userName: String!
    email: String!
    name: String!
  }

  input UpdateUserInput {
    userName: String
    email: String
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
  }
`
