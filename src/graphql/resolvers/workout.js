import { Workout } from '../../models/Workout';
import { AuthenticationError } from 'apollo-server-express';
import { Exercise } from '../../models/Exercise';

export const resolvers = {
  Query: {
    getWorkouts: async (_) => await Workout.find(),
    getWorkout: async (_, { id }) => {
      try {
        const workout = await Workout.findById(id);
        console.log(workout);

        return workout;
      } catch (err) {
        console.error(err);
      }
    },
  },
  Mutation: {
    createWorkout: async (
      _,
      { name, difficulty, category, target, createdBy, exercises },
      { req }
    ) => {
      if (!req.userId) return new AuthenticationError('Not authenticated');

      try {
        const newWorkout = new Workout({
          name,
          difficulty,
          category,
          target,
          createdBy,
          exercises,
        });

        const workout = await newWorkout.save();

        return workout;
      } catch (err) {
        console.error(err);
      }
    },
    updateWorkout: async (_, {}, { req }) => {},
    deleteWorkout: async (_, { id }, { req }) => {
      if (!req.userId) {
        console.log(2);
        return new AuthenticationError('Not authenticated.');
      }
      try {
        const removable = await Workout.findByIdAndRemove(id);

        if (removable) {
          return `${removable.name} removed`;
        } else return 'Not found :(';
      } catch (err) {
        console.error(err);
      }
    },
  },
};
