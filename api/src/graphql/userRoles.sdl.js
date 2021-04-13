export const schema = gql`
  type UserRole {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    User: User
    userId: Int
  }

  type Query {
    userRoles: [UserRole!]!
  }

  input CreateUserRoleInput {
    name: String!
    userId: Int
  }

  input UpdateUserRoleInput {
    name: String
    userId: Int
  }
`
