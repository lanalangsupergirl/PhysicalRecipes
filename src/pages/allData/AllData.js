import * as React from 'react';
import AllRecipes from '../../AllRecipes/AllRecipes';
import SearchResults from '../../SearchResults/SearchResults';
import { useSelector } from 'react-redux';

export default function AllData() {
  const flag = useSelector((state) => state.search.flag);

  return <>{flag === true ? <SearchResults /> : <AllRecipes />}</>;
}
