const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../utils/auth');
const { User, Exercise, WeeklyStats } = require('../models');
const stripe = require('stripe')('sk_test_51N9GI3HfMu1TGSRki70Om2NBeMHPhtiFJFDJGyMsVMBxNt0S3Px5kstlls10XPd3C0Q8wzGmLRodYWQa4vcHZ17y00AT3Mogxj');

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
      const weeklyStats = await WeeklyStats.findOne();
      const transformedStats = {
        weekStartDate: weeklyStats.weekStartDate,
        exerciseCounts: [],
        totalExerciseTime: 0,
      };

      const exerciseCounts = {};
      weeklyStats.exercises.forEach((exercise) => {
        if (exerciseCounts[exercise.exerciseType]) {
          exerciseCounts[exercise.exerciseType]++;
        } else {
          exerciseCounts[exercise.exerciseType] = 1;
        }
        transformedStats.totalExerciseTime += exercise.exerciseTime;
      });

      transformedStats.exerciseCounts = Object.entries(exerciseCounts).map(([exerciseType, count]) => ({
        exerciseType,
        count,
      }));

      return transformedStats;
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      const user = await User.create(input);
      const token = generateToken(user);
      return { token, user };
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      console.log('Email', email);
      console.log('Password', password);
      const user = await User.findOne({ email });

      if (!user || !user.verifyPassword(password)) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = generateToken(user);
      return { token, user };
    },
    addExercise: async (_, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const { name, description, date } = input;

      const exercise = await Exercise.create({ name, description, date });

      await User.findByIdAndUpdate(context.user._id, { $push: { exercises: exercise._id } });

      // Update the weekly stats by adding the exercise to the current week's data
      const weeklyStats = await WeeklyStats.findOne();

      weeklyStats.exercises.push(exercise);

      await weeklyStats.save();

      return exercise;
    },
    addWeeklyStats: async (_, { input }) => {
      const stats = await WeeklyStats.create(input);
      return stats;
    },
    processPayment: async (_, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      // Retrieve the necessary payment details from the input
      const { amount, paymentMethodId } = input;

      try {
        // Create a PaymentIntent using the Stripe API
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd', // Change this according to your currency
          payment_method: paymentMethodId,
          confirmation_method: 'manual',
          confirm: true,
        });

        // Handle any additional steps required by Stripe (e.g., 3D Secure authentication)
        if (paymentIntent.status === 'requires_action' && paymentIntent.next_action.type === 'use_stripe_sdk') {
          // Return the client secret to the client, which will be used to complete the payment process
          return { clientSecret: paymentIntent.client_secret };
        }

        // Payment succeeded
        // Perform any necessary actions in your application (e.g., update database, send email)
        // Return the relevant data to the client
        return { success: true, paymentIntentId: paymentIntent.id };
      } catch (error) {
        // Handle errors and return relevant information to the client
        console.error('Error processing payment:', error);
        return { success: false, error: 'Payment failed' };
      }
    },
  },
};

module.exports = resolvers;
