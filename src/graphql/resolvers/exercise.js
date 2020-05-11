import { Exercise } from '../../models/Exercise';
import { AuthenticationError } from 'apollo-server-express';

export const resolvers = {
  Query: {
    getExercises: async (_) => {
      return await Exercise.find();
    },
    getExercise: async (_, { id }) => {
      try {
        // add some check if exercise id is not correct?
        // cuz if it happens the app will crash :D
        // edit: maybe not needed, server re-boots lol
        const exercise = await Exercise.findById(id);
        console.log(exercise);

        if (!exercise) {
          console.log('do iiit');
        }

        return exercise;
      } catch (err) {
        console.error(err);
      }
    },
  },
  Mutation: {
    createExercise: async (_, { name, type, difficulty, target }, { req }) => {
      // @TODO: add validation

      if (!req.userId) {
        return new AuthenticationError('haista vittu');
      }

      console.log(3);

      try {
        const newExercise = new Exercise({
          name,
          type,
          difficulty,
          target,
        });

        console.log(newExercise);

        const exercise = await newExercise.save();

        console.log(exercise);

        return exercise;
      } catch (err) {
        console.error(err);
      }
    },
    updateExercise: async (_, { id, name, type, difficulty, target }, { req }) => {
      if (!req.userId) {
        return new AuthenticationError('haista vittu');
      }
      try {
        const exerciseToUpdate = { _id: id };
        const exercise = { name, type, difficulty, target };
        const updatedExercise = await Exercise.findOneAndUpdate(exerciseToUpdate, exercise, {
          returnOriginal: false,
        });

        console.log(updatedExercise);
        return updatedExercise;
      } catch (err) {
        console.error(err);
      }
    },
    deleteExercise: async (_, { id }, { req }) => {
      if (!req.userId) {
        console.log(2);
        return new AuthenticationError('haista vittu');
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
