import { Exercise } from '../../models/Exercise';
import { Workout } from '../../models/Workout';
import { AuthenticationError } from 'apollo-server-express';

export const resolvers = {
  Query: {
    createWorkout: async (_, { name, difficulty, category, target, createdBy, exercises }) => {
      try {
      } catch (err) {
        console.error(err);
      }
    },
  },
};
