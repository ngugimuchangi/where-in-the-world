// Error element for no countries found
export default function NoCountriesFound({ message = 'No countries found' }) {
  return (
    <p className='no-countries-found fs-lg text-body fs-900'>{message}</p>
  )
}
