import { useRouter, useSearchParams } from 'next/navigation';

export function useTypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedType = searchParams.get('type');

  const setTypeFilter = (type: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (type && type !== selectedType) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  return { selectedType, setTypeFilter };
}
