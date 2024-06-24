import React from 'react';
import { useFetch } from '../lib/hooks/useFetch';

interface Data {
  id: number;
  name: string;
  // Add other properties as needed
}

const MyComponent: React.FC = () => {
  const { data, loading, error } = useFetch<Data[]>('/api/data');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data?.map((item: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
        <div key={item.id}>
          <p>{item.name}</p>
          {/* Render other properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
