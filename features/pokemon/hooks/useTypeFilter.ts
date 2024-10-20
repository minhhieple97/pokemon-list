import { PAGE_PARAM, TYPES_PARAM } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';

export function useTypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTypes = searchParams.get(TYPES_PARAM)?.split(',').map(Number) || [];

  const setTypeFilter = (typeId: number) => {
    const params = new URLSearchParams(searchParams);
    let newTypes = [...selectedTypes];

    if (newTypes.includes(typeId)) {
      newTypes = newTypes.filter((id) => id !== typeId);
    } else {
      newTypes.push(typeId);
    }

    if (newTypes.length > 0) {
      params.set(TYPES_PARAM, newTypes.join(','));
    } else {
      params.delete(TYPES_PARAM);
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const removeTypeFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(TYPES_PARAM);
    params.set(PAGE_PARAM, '1');
    router.push(`/?${params.toString()}`);
  };

  return { selectedTypes, setTypeFilter, removeTypeFilter };
}
