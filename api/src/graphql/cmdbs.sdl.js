export const schema = gql`
  type Cmdb {
    id: Int!
    number: String!
    title: String
    Ticket: [Ticket]!
  }

  type Query {
    cmdbs: [Cmdb!]!
    cmdb(id: Int!): Cmdb
  }

  input CreateCmdbInput {
    number: String!
    title: String
  }

  input UpdateCmdbInput {
    number: String
    title: String
  }

  type Mutation {
    createCmdb(input: CreateCmdbInput!): Cmdb!
    updateCmdb(id: Int!, input: UpdateCmdbInput!): Cmdb!
    deleteCmdb(id: Int!): Cmdb!
  }
`
