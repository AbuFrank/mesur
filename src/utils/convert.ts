import { Unit } from '../types';

export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
  return toUnit.fromBase(fromUnit.toBase(value));
}

export function parseNumericInput(text: string): number | null {
  if (!/^-?\d*\.?\d*$/.test(text)) return null;
  if (text === '' || text === '-' || text === '.' || text === '-.') return null;
  const value = Number(text);
  return Number.isFinite(value) ? value : null;
}
