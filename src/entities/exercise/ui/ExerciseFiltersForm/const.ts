import { ExerciseCategory, ExerciseEquipment, ExerciseForce, ExerciseMuscle } from '@prisma/client';
import type { ExerciseFiltersForm } from './types';

export const EXERCISE_FILTERS_FORM_INITIAL_VALUES: ExerciseFiltersForm = {
  muscle: '',
  force: '',
  category: '',
  equipment: ''
};

const exerciseMuscleSelectOptionLabels: Record<ExerciseMuscle, string> = {
  ABDOMINALS: 'Брюшной пресс',
  HAMSTRINGS: 'Бицепс бедра',
  CALVES: 'Голени',
  SHOULDERS: 'Плечи',
  ADDUCTORS: 'Приводящие мышцы бедра',
  GLUTES: 'Ягодицы',
  QUADRICEPS: 'Квадрицепс',
  BICEPS: 'Бицепс',
  FOREARMS: 'Предплечья',
  ABDUCTORS: 'Отводящие мышцы бедра',
  TRICEPS: 'Трицепс',
  CHEST: 'Грудь',
  LOWER_BACK: 'Поясница',
  TRAPS: 'Трапеция',
  MIDDLE_BACK: 'Мышцы средней части спины',
  LATS: 'Широчайшие мышцы',
  NECK: 'Шея'
};

export const exerciseMuscleSelectOptions = Object.values(ExerciseMuscle).map((value) => ({
  label: exerciseMuscleSelectOptionLabels[value],
  value
}));

const exerciseEquipmentSelectOptionLabels: Record<ExerciseEquipment, string> = {
  BODY: 'Собственный вес',
  MACHINE: 'Тренажер',
  KETTLEBELLS: 'Гири',
  DUMBBELL: 'Гантели',
  CABLE: 'Трос',
  BARBELL: 'Штанга',
  BANDS: 'Резинки',
  MEDICINE_BALL: 'Медбол',
  EXERCISE_BALL: 'Фитбол',
  E_Z_CURL_BAR: 'Изогнутый гриф',
  FOAM_ROLL: 'Массажный роллер',
  OTHER: 'Другое'
};

export const exerciseEquipmentSelectOptions = Object.values(ExerciseEquipment).map((value) => ({
  label: exerciseEquipmentSelectOptionLabels[value],
  value
}));

const exerciseCategorySelectOptionLabels: Record<ExerciseCategory, string> = {
  STRENGTH: 'Силовые',
  STRETCHING: 'Стретчинг',
  PLYOMETRICS: 'Плиометрика',
  STRONGMAN: 'Стронгмен',
  POWERLIFTING: 'Пауерлифтинг',
  CARDIO: 'Кардио',
  OLYMPIC_WEIGHTLIFTING: 'Тяжелая атлетика',
  CROSSFIT: 'Кроссфит',
  WEIGHTED_BODYWEIGHT: 'Собственный вес с отяжелением',
  ASSISTED_BODYWEIGHT: 'Собственный вес с поддержкой'
};

export const exerciseCategorySelectOptions = Object.values(ExerciseCategory).map((value) => ({
  label: exerciseCategorySelectOptionLabels[value],
  value
}));

const exerciseForceSelectOptionLabels: Record<ExerciseForce, string> = {
  PULL: 'Тяга',
  PUSH: 'Жим',
  STATIC: 'Статика'
};

export const exerciseForceSelectOptions = Object.values(ExerciseForce).map((value) => ({
  label: exerciseForceSelectOptionLabels[value],
  value
}));
