import * as React from 'react';
import CategoriesSorting from '../../CategoriesSorting/CategoriesSorting';
import SearchResults from '../../SearchResults/SearchResults';
import { useSelector } from 'react-redux';

export default function CategoriesSort() {
    const flag = useSelector((state) => state.search.flag);

    return <>{flag === true ? <SearchResults /> : <CategoriesSorting />}</>;
}