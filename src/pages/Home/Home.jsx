import { Suspense } from 'react';
import { Await, defer, redirect, useLoaderData } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle.js';
import SearchBar from '../../components/ui/SearchBar.jsx';
import SearchContextProvider from '../../contexts/searchContext.jsx';
import CountryCards from './components/CountryCards.jsx';
import CountryCardSkeletons from './components/CountryCardSkeletons.jsx';
import NoCountriesFound from '../../components/ui/NoCountriesFound.jsx';
import fetchData from '../../utils/fetchData';
import formatCountryData from '../../utils/formatCountryData';
import fields from '../../data/fields.js';

/**
 * Home route data loader
 * @returns {Promise} - country data promise
 */
export async function loader({ request }) {
  const url = new URL(request.url);
  const redirection = url.searchParams.get('r');
  if (redirection) return redirect(redirection);

  const searchUrl = `https://restcountries.com/v3.1/all?fields=${fields.join(',')}`;

  const countries = fetchData(searchUrl)
    .then((data) => data.map((country) => formatCountryData(country)));
  return defer({ countries });
}

/**
 * Home page
 */
export default function Home() {
  const { countries } = useLoaderData();
  usePageTitle('Where in the world');
  return (
    <SearchContextProvider>
      <SearchBar />
      <Suspense fallback={<CountryCardSkeletons />}>
        <Await resolve={countries} errorElement={<NoCountriesFound />}>
          <CountryCards />
        </Await>
      </Suspense>
    </SearchContextProvider>
  );
}
