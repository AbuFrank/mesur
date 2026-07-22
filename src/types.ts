export type CategoryId = 'length' | 'weight' | 'temperature' | 'volume';

export interface Unit {
  id: string;
  categoryId: CategoryId;
  label: string;
  fullName: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface Category {
  id: CategoryId;
  label: string;
  baseUnitId: string;
  units: Unit[];
}

export interface StoredPair {
  id: string;
  categoryId: CategoryId;
  fromUnitId: string;
  toUnitId: string;
  savedAt: number;
}
