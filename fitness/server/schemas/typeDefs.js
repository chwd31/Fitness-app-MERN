const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    exercises: [Exercise]
    profile: Profile
  }

  type Profile {
    _id: ID
    name: String
    age: Int
    height: Int
    weight: Int
  }

  type Exercise {
    _id: ID
    name: String
    description: String
  }

  type WeeklyStats {
    _id: ID
    date: String
    weight: Float
    calories: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type PaymentResult {
    success: Boolean!
    paymentIntentId: String
    clientSecret: String
    error: String
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ExerciseInput {
    name: String!
    description: String!
  }

  input WeeklyStatsInput {
    date: String!
    weight: Float!
    calories: Int!
  }

  input PaymentInput {
    amount: Int!
    paymentMethodId: String!
  }

  type Query {
    me: User
    exercises: [Exercise]
    weeklyStats: [WeeklyStats]
  }

  type Mutation {
    signup(input: SignupInput): Auth
    login(input: LoginInput): Auth
    addExercise(input: ExerciseInput): Exercise
    addWeeklyStats(input: WeeklyStatsInput): WeeklyStats
    processPayment(input: PaymentInput): PaymentResult
  }
`;

module.exports = typeDefs;
