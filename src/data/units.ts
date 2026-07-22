import { Category, CategoryId, Unit } from '../types';

function linearUnit(
  categoryId: CategoryId,
  id: string,
  label: string,
  fullName: string,
  metersPerUnit: number
): Unit {
  return {
    id,
    categoryId,
    label,
    fullName,
    toBase: (value) => value * metersPerUnit,
    fromBase: (base) => base / metersPerUnit,
  };
}

const length: Category = {
  id: 'length',
  label: 'Length',
  baseUnitId: 'm',
  units: [
    linearUnit('length', 'mm', 'mm', 'Millimeters', 0.001),
    linearUnit('length', 'cm', 'cm', 'Centimeters', 0.01),
    linearUnit('length', 'm', 'm', 'Meters', 1),
    linearUnit('length', 'km', 'km', 'Kilometers', 1000),
    linearUnit('length', 'in', 'in', 'Inches', 0.0254),
    linearUnit('length', 'ft', 'ft', 'Feet', 0.3048),
    linearUnit('length', 'yd', 'yd', 'Yards', 0.9144),
    linearUnit('length', 'mi', 'mi', 'Miles', 1609.344),
  ],
};

const weight: Category = {
  id: 'weight',
  label: 'Weight',
  baseUnitId: 'kg',
  units: [
    linearUnit('weight', 'mg', 'mg', 'Milligrams', 1e-6),
    linearUnit('weight', 'g', 'g', 'Grams', 0.001),
    linearUnit('weight', 'kg', 'kg', 'Kilograms', 1),
    linearUnit('weight', 'oz', 'oz', 'Ounces', 0.028349523125),
    linearUnit('weight', 'lb', 'lb', 'Pounds', 0.45359237),
  ],
};

const temperature: Category = {
  id: 'temperature',
  label: 'Temp',
  baseUnitId: 'c',
  units: [
    {
      id: 'c',
      categoryId: 'temperature',
      label: '°C',
      fullName: 'Celsius',
      toBase: (v) => v,
      fromBase: (b) => b,
    },
    {
      id: 'f',
      categoryId: 'temperature',
      label: '°F',
      fullName: 'Fahrenheit',
      toBase: (v) => ((v - 32) * 5) / 9,
      fromBase: (b) => (b * 9) / 5 + 32,
    },
    {
      id: 'k',
      categoryId: 'temperature',
      label: 'K',
      fullName: 'Kelvin',
      toBase: (v) => v - 273.15,
      fromBase: (b) => b + 273.15,
    },
  ],
};

const volume: Category = {
  id: 'volume',
  label: 'Volume',
  baseUnitId: 'l',
  units: [
    linearUnit('volume', 'ml', 'mL', 'Milliliters', 0.001),
    linearUnit('volume', 'l', 'L', 'Liters', 1),
    linearUnit('volume', 'flOz', 'fl oz', 'Fluid Ounces', 0.0295735295625),
    linearUnit('volume', 'cup', 'cup', 'Cups', 0.2365882365),
    linearUnit('volume', 'pt', 'pt', 'Pints', 0.473176473),
    linearUnit('volume', 'qt', 'qt', 'Quarts', 0.946352946),
    linearUnit('volume', 'gal', 'gal', 'Gallons', 3.785411784),
  ],
};

export const categories: Category[] = [length, weight, temperature, volume];

export function getCategory(categoryId: CategoryId): Category {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) throw new Error(`Unknown category: ${categoryId}`);
  return category;
}

export function getUnit(categoryId: CategoryId, unitId: string): Unit {
  const unit = getCategory(categoryId).units.find((u) => u.id === unitId);
  if (!unit) throw new Error(`Unknown unit ${unitId} in category ${categoryId}`);
  return unit;
}
