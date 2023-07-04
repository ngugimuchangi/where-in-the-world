import { useRef } from 'react';

export default function Image({ src, alt }) {
  const ref = useRef();
  return (
    <img
      ref={ref}
      className='text-body'
      src={src}
      alt={alt}
    />
  );
}
