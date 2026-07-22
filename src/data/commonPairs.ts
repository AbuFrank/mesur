import { CategoryId } from '../types';

const commonPairs: Record<CategoryId, Record<string, string>> = {
  length: { mm: 'in', cm: 'in', m: 'ft', km: 'mi', in: 'cm', ft: 'm', yd: 'm', mi: 'km' },
  weight: { mg: 'g', g: 'oz', kg: 'lb', oz: 'g', lb: 'kg' },
  temperature: { c: 'f', f: 'c', k: 'c' },
  volume: { ml: 'flOz', l: 'gal', flOz: 'ml', cup: 'ml', pt: 'l', qt: 'l', gal: 'l' },
};

export function getCommonPairUnitId(
  categoryId: CategoryId,
  unitId: string,
  allUnitIds: string[]
): string {
  const mapped = commonPairs[categoryId]?.[unitId];
  if (mapped && mapped !== unitId) return mapped;
  return allUnitIds.find((id) => id !== unitId) ?? unitId;
}
