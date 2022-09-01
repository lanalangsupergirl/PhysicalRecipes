export function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function getRecipeById(recipes, id) {
  console.log('getRecipeById recipes', recipes);
  console.log('getRecipeById id', id);
  const item = recipes.find((recipe) => recipe.id === id);

  return item;
}

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
