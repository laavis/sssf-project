import mongoose from 'mongoose';

export const WorkoutExerciseSchema = new mongoose.Schema({
  exercise: mongoose.Types.ObjectId,
  repCount: Number,
  weight: Number,
  name: String,
});

export const WorkoutExercise = mongoose.model('workout_exercise', WorkoutExerciseSchema);
