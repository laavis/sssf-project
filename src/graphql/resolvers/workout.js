import { Workout } from '../../models/Workout';
import { AuthenticationError } from 'apollo-server-express';
import { Exercise } from '../../models/Exercise';

export const resolvers = {
  Query: {
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
        const ids = [];
        exercises.forEach((exercise) => {
          ids.push(exercise.id);
        });

        const exercises2 = await Exercise.find().where('_id').in(ids);

        const newWorkout = new Workout({
          name,
          difficulty,
          category,
          target,
          createdBy,
          exercises: exercises2,
        });

        const workout = await newWorkout.save();

        return workout;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
