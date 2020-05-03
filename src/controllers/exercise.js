import config from 'config';
import { Exercise } from '../models/Exercise';
import { validateCreateExercise } from '../helpers/validation';

const createEx = async (name, type, difficulty, target) => {
  const userInput = {
    name,
    target,
  };

  const validationErrors = validateCreateExercise(userInput);

  if (validationErrors.length > 0) {
    validationErrors.map((err) => errors.push(err));
    return {
      exercise: null,
      errors,
    };
  }

  try {
    let exercise = await Exercise.findOne({ name });

    if (exercise) {
      errors.push({
        type: 'exercise',
        message: 'This exercise already exists',
      });
      return {
        exercise: null,
        errors,
      };
    }

    exercise = new Exercise({
      name,
      type,
      difficulty,
      target,
    });

    await exercise.save();

    return {
      exercise,
      errors,
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createEx,
};
