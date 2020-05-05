import { Exercise } from '../../models/Exercise';
import { AuthenticationError } from 'apollo-server-express';

export const resolvers = {
  Query: {
    create: async (_, { name, type, difficulty, target }, { req }) => {
      if (!req.userId) {
        return new AuthenticationError('haista vittu');
      }

      try {
        const newExercise = new Exercise({
          name,
          type,
          difficulty,
          target,
        });

        const exercise = await newExercise.save();

        return exercise;
      } catch (err) {
        console.error(err);
      }

      return ':D';
    },
  },
};
