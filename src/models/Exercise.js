import mongoose from 'mongoose';

export const ExerciseSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['push', 'pull'],
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  target: {
    type: String,
    enum: ['chest', 'back', 'shoulders', 'biceps', 'legs', 'glutes', 'back', 'triceps', 'abs'],
  },
});

export const Exercise = mongoose.model('exercise', ExerciseSchema);
