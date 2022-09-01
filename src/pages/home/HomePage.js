import * as React from 'react';
import { useSelector } from 'react-redux';
import TitlePage from '../../TitlePage/TitlePage';
import SearchResults from '../../SearchResults/SearchResults';

export default function HomePage() {
  const flag = useSelector((state) => state.search.flag);

  return <>{flag === true ? <SearchResults /> : <TitlePage />}</>;
}
