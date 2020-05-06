import { Exercise } from '../../models/Exercise';
import { AuthenticationError } from 'apollo-server-express';

export const resolvers = {
  Query: {
    getAll: async (_) => {
      return await Exercise.find();
    },
    getOne: async (_, id) => {
      const exercise = Exercise.find({ id: id });

      console.log(exercise);

      if (!exercise) {
      }

      return exercise;
    },
    create: async (_, { name, type, difficulty, target }, { req }) => {
      // @TODO: add validation

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
    },
  },
};
