import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import BackButton from '../../components/ui/BackButton.jsx';
import CountryDetails from './components/CountryDetails.jsx';
import fetchData from '../../utils/fetchData';
import formatCountryData from '../../utils/formatCountryData';
import CountryInfoSkeleton from '../../components/ui/CountryInfoSkeleton.jsx';
import NoCountriesFound from '../../components/ui/NoCountriesFound.jsx';
import fields from '../../data/fields.js';
/**
 * Country page loader. Fetches data for specific country
 * @param {object} - route info
 * @returns {Promise} promise that resolves with country data
 */
export async function loader({ params }) {
  const { alpha } = params;
  const url = `https://restcountries.com/v3.1/alpha/${alpha}?fields=${fields.join(',')}`;
  const data = fetchData(url)
    .then((country) => formatCountryData(country))
    .then(async (country) => {
      const bordersPromises = [];
      for (const borderAlpha of country.borders) {
        bordersPromises.push(fetchData(`https://restcountries.com/v3.1/alpha/${borderAlpha}/?fields=name,cca2`));
      }
      const borders = (await Promise.all(bordersPromises))
        .map((country) => ({ name: country.name.common, alpha: country.cca2 }));
      country.borders = borders;
      return country;
    });

  return defer({ country: data });
}

/**
 * Country page - Contains information about a country
 * including its flag, native name, population, region,
 * subregion, capital, top level domain, currencies,
 * languages and bordering countries
 */
export default function Country() {
  const { country } = useLoaderData();

  return (
    <>
      <BackButton />
      <div className='country-info flex flex-row flex-wrap justify-space-between'>
        <Suspense fallback={<CountryInfoSkeleton />}>
          <Await resolve={country} errorElement={<NoCountriesFound message={'Country not found'} />}>
            <CountryDetails />
          </Await>
        </Suspense>
      </div>
    </>
  );
}
