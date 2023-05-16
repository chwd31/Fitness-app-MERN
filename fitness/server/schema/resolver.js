const { exercises, users } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await users.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('exercises');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await users.create(args);
            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;