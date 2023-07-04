import { useAsyncValue } from 'react-router-dom';
import CountryCard from '../../../components/ui/CountryCard.jsx';
import useCountries from '../../../hooks/useCountries';
import NoCountriesFound from '../../../components/ui/NoCountriesFound.jsx';

/**
 * Country cards
 */
export default function CountryCards() {
  const countries = useAsyncValue();
  const visibleCountries = useCountries(countries);
  if (!visibleCountries.length) return <NoCountriesFound />
  return (
    <div className='cards-section flex flex-row flex-wrap'>
      {
        visibleCountries.map((country, index) => <CountryCard key={index} country={country} />)
      }
    </div>
  );
}
