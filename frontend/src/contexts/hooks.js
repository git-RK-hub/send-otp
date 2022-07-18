import { useContext } from 'react';

export function useAPI(apiContext) {
  const context = useContext(apiContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
