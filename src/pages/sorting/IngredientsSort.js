import * as React from 'react';
import IngredientsSorting from '../../IngredientsSorting/IngredientsSorting';
import SearchResults from '../../SearchResults/SearchResults';
import { useSelector } from 'react-redux';

export default function IngredientsSort() {
  const flag = useSelector((state) => state.search.flag);

  return <>{flag === true ? <SearchResults /> : <IngredientsSorting />}</>;
}
