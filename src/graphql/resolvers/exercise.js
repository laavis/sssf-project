import { Exercise } from '../../models/Exercise';
import { AuthenticationError } from 'apollo-server-express';

export const resolvers = {
  Query: {
    getExercises: async _ => {
      return await Exercise.find();
    },
    getExercise: async (_, { id }) => {
      try {
        // add some check if exercise id is not correct?
        // because if it happens the app will crash :D
        // edit: maybe not needed, server re-boots lol
        const exercise = await Exercise.findById(id);

        if (!exercise) {
        }

        return exercise;
      } catch (err) {
        console.error(err);
      }
    },
  },
  Mutation: {
    createExercise: async (_, { name, description, type, difficulty, target }, { req }) => {
      // @TODO: add validation

      if (!req.userId) {
        return new AuthenticationError('Not authorized!');
      }

      try {
        const newExercise = new Exercise({
          name,
          description,
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
    updateExercise: async (_, { id, name, type, difficulty, target }, { req }) => {
      if (!req.userId) {
        return new AuthenticationError('Not authorized!');
      }
      try {
        const exerciseToUpdate = { _id: id };
        const exercise = { name, type, difficulty, target };
        const updatedExercise = await Exercise.findOneAndUpdate(exerciseToUpdate, exercise, {
          returnOriginal: false,
        });

        return updatedExercise;
      } catch (err) {
        console.error(err);
      }
    },
    deleteExercise: async (_, { id }, { req }) => {
      if (!req.userId) {
        return new AuthenticationError('Not authorized!');
      }

      try {
        const exercise = await Exercise.findById(id);
        if (!exercise) return 'Exercise not found';
        await exercise.remove();
        return 'Exercise deleted';
      } catch (err) {
        console.error(err);
      }
    },
  },
};
