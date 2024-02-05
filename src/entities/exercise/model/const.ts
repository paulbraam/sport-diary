import { ExerciseCategory, ExerciseEquipment, ExerciseForce, ExerciseMuscle } from '@prisma/client';
import type {
  CatalogExercisesState,
  ExerciseCategoryMap,
  ExerciseEquipmentMap,
  ExerciseFiltersForm,
  ExerciseForceMap,
  ExerciseMuscleMap
} from './types';

export const CATALOG_EXERCISES_STORE_NAME = 'catalog_exercises';

export const CATALOG_EXERCISES_INITIAL_STATE: CatalogExercisesState = {
  exercises: []
};

const exerciseMuscleSelectOptionLabels: ExerciseMuscleMap = {
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

const exerciseEquipmentSelectOptionLabels: ExerciseEquipmentMap = {
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

const exerciseCategorySelectOptionLabels: ExerciseCategoryMap = {
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

const exerciseForceSelectOptionLabels: ExerciseForceMap = {
  PULL: 'Тяга',
  PUSH: 'Жим',
  STATIC: 'Статика'
};

export const exerciseForceSelectOptions = Object.values(ExerciseForce).map((value) => ({
  label: exerciseForceSelectOptionLabels[value],
  value
}));

export const exerciseFiltersInitialValues: ExerciseFiltersForm = {
  muscle: '',
  force: '',
  category: '',
  equipment: ''
};
