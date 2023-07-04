/**
 * Fetches data from given url
 * @param {String} url - url to fetch data from
 * @returns {Promise} - promise that resolves to the data fetched from the url
 */
export default async function fetchData(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}
