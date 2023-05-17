const { User, Profile, Exercise, WeeklyStats } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('profile').populate('exercises');
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    exercises: async () => {
      const exercises = await Exercise.find();
      return exercises;
    },
    weeklyStats: async () => {
      const stats = await WeeklyStats.find();
      return stats;
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      const user = await User.create(input);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({ email });

      if (!user || !user.verifyPassword(password)) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = signToken(user);
      return { token, user };
    },
    addExercise: async (_, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const exercise = await Exercise.create(input);

      await User.findByIdAndUpdate(context.user._id, { $push: { exercises: exercise._id } });

      return exercise;
    },
    addWeeklyStats: async (_, { input }) => {
      const stats = await WeeklyStats.create(input);
      return stats;
    },
  },
};

module.exports = resolvers;
