const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
        email: String
        exercises: [Exercise]
    }

    type Exercise {
        _id: ID
        name: String
        weight: Int
        sets: Int
        reps: Int
        duration: Int
        distance: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        exercises: [Exercise]
        exercise(_id: ID!): Exercise
    }


    type Query {
        getUsers: [User]
        getExercises(username: String): [Exercise]
    }
    type Mutation {
        addUser(username: String!, password: String!, email: String!): Auth
        addExercise(name: String!, weight: Int!, sets: Int!, reps: Int!, duration: Int!, distance: Int!): Exercise
        removeExercise(_id: ID!): Exercise
        login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;