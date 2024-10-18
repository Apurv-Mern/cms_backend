const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    status: String!
    age: Int!
  }

  type Role {
    roleId: ID!
    roleName: String!
  }

  type UserRole {
    userId: ID!
    roleId: ID!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      gender: String!
      status: String!
      age: Int!
      password: String!
      roleName: String!
    ): User!

    updateUser(
      userId: ID!
      firstName: String
      lastName: String
      email: String
      gender: String
      status: String
      age: Int
      password: String
    ): User!

    deleteUser(userId: ID!): String!
  }
`;

module.exports = typeDefs;
