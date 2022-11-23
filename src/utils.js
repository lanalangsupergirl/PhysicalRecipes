export function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function getRecipeById(recipes, id) {
  const item = recipes.find((recipe) => recipe.id === id);
  return item;
}

export const ingredients = [
  'яйца',
  'молоко',
  'курица',
  'говядина',
  'авокадо',
  'творог',
  'сыр',
  'йогурт',
  'морепродукты',
];

export const categories = [
  'завтрак',
  'обед',
  'ужин',
  'белок',
  'выпечка',
  'десерт',
  'сушка',
  'массонабор',
  'поддержка',
];

export const settings = ['Профиль', 'Аккаунт', 'Избранное', 'Выход'];

export function capitalize(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

export const urlImg = 'http://localhost:8080';
