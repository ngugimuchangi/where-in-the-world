import { useAsyncValue } from 'react-router-dom';
import usePageTitle from '../../../hooks/usePageTitle.js';
import CountryInfoCard from '../../../components/ui/CountryInfoCard.jsx';
import Image from '../../../components/ui/Image.jsx';
import BorderCountries from '../../../components/ui/BorderCountries.jsx';

// All countries that meet current search criteria
export default function CountryDetails() {
  const country = useAsyncValue();
  usePageTitle(`Where in the world | ${country.name}`);

  return (
    <>
      <div className='country-info__flag'>
        <Image src={`${country.flags.svg}#svgView(preserveAspectRatio(none))`} />
      </div>
      <div className='country-info__text--container'>
        <CountryInfoCard country={country} />
        <BorderCountries borderCountries={country.borders} />
      </div>
    </>
  );
}
