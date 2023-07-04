import { useEffect } from 'react';

/**
 * Updates page title on location change
 * @param {Sting} title 
 */
export default function usePageTitle(title) {
  useEffect(() => {
    if (document.title !== title) document.title = title;
  }, [title]);
}
