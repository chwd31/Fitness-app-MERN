const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    profile: Profile
    exercises: [Exercise]
  }

  type Profile {
    _id: ID!
    name: String
    age: Int
    height: Float
    weight: Float
  }

  type Exercise {
    _id: ID!
    exerciseType: String!
    exerciseTime: Int!
    exerciseDate: String!
  }

  type WeeklyStats {
    _id: ID!
    exercise: String!
    count: Int!
    minutes: Int!
  }

  type Auth {
    token: String!
    user: User
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
    name: String
    age: Int
    height: Float
    weight: Float
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ExerciseInput {
    exerciseType: String!
    exerciseTime: Int!
    exerciseDate: String!
  }

  input WeeklyStatsInput {
    exercise: String!
    count: Int!
    minutes: Int!
  }

  type Query {
    me: User
    exercises: [Exercise]
    weeklyStats: [WeeklyStats]
  }

  type Mutation {
    signup(input: SignupInput!): Auth
    login(input: LoginInput!): Auth
    addExercise(input: ExerciseInput!): Exercise
    addWeeklyStats(input: WeeklyStatsInput!): WeeklyStats
    processPayment(input: ProcessPaymentInput!): ProcessPaymentResponse!
  }

  input ProcessPaymentInput {
    amount: Float!
    paymentMethodId: String!
  }

  type ProcessPaymentResponse {
    success: Boolean!
    error: String
    clientSecret: String
  }
`;

module.exports = typeDefs;
