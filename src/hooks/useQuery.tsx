import { useState } from 'react';
import { toast } from 'sonner';
import { delay } from '@/lib/delay.ts';

interface UseQueryConfiguration<T> {
  toastConfiguration?: {
    showError: boolean;
    successDescription?: ((result: T) => string) | string;
  };
}

const useQuery = <T,>(query: () => Promise<T>, config: UseQueryConfiguration<T>) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<T | undefined>();
  const [error, setError] = useState<Error | undefined>();

  const execute = async () => {
    setLoading(true);
    try {
      if (import.meta.env.DEV) {
        // Mock latency
        await delay(1500, () => {});
      }
      const response = await query();
      setResult(response);
      setError(undefined);
      const successDescription = config.toastConfiguration?.successDescription;
      if (successDescription) {
        if (successDescription instanceof Function) {
          toast.success(successDescription(response));
        } else {
          toast.success(successDescription);
        }
      }
    } catch (err) {
      setError(err as Error);
      if (config.toastConfiguration?.showError) {
        console.log(config.toastConfiguration?.showError);
        toast.error((err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, execute };
};

export default useQuery;
