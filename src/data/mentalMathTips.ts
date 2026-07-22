import { CategoryId } from '../types';

type TipMap = Record<string, string>;

const mentalMathTips: Partial<Record<CategoryId, TipMap>> = {
  length: {
    'km->mi':
      'Fibonacci trick: in the sequence 1, 1, 2, 3, 5, 8, 13, 21, 34, 55… find your km value, then read the previous number as miles.',
    'mi->km':
      'Fibonacci trick: in the sequence 1, 1, 2, 3, 5, 8, 13, 21, 34, 55… find your mile value, then read the next number as km.',
    'cm->in': 'Divide by 2.5 for a quick estimate (actual factor is 2.54).',
    'in->cm': 'Multiply by 2.5 for a quick estimate (actual factor is 2.54).',
    'mm->in': 'Divide by 25 for a rough estimate (actual factor is 25.4).',
    'm->ft': 'Multiply by 3, then add 10% (actual factor is 3.28).',
    'ft->m': 'Divide by 3, then subtract 10% (actual factor is 0.3048).',
    'yd->m': 'Yards and meters are close — subtract about 10% (a yard is ~0.91 m).',
  },
  weight: {
    'kg->lb': 'Double it, then add 10% of the original (2.2x total).',
    'lb->kg': 'Halve it, then subtract 10% of that half (0.45x total).',
    'g->oz': 'Divide by 30 for a rough estimate (actual factor is 28.35).',
    'oz->g': 'Multiply by 30 for a rough estimate (actual factor is 28.35).',
    'mg->g': 'Move the decimal point 3 places left.',
  },
  temperature: {
    'c->f': 'Double it and add 30 for a quick estimate (exact formula is x1.8 + 32).',
    'f->c': 'Subtract 30 and halve it for a quick estimate (exact formula is (x-32) x 5/9).',
    'k->c': 'Subtract 273 for a quick estimate (drop the .15).',
  },
  volume: {
    'l->gal': 'Divide by 4 — 4 liters is close to 1 gallon (actual ~3.785).',
    'gal->l': 'Multiply by 4 — 1 gallon is close to 4 liters (actual ~3.785).',
    'ml->flOz': 'Divide by 30 — 1 fl oz is about 30 mL.',
    'flOz->ml': 'Multiply by 30 — 1 fl oz is about 30 mL.',
    'cup->ml': 'Multiply by 240 — 1 cup is about 240 mL.',
    'pt->l': 'Divide by 2, then add a touch — 2 pints is just over 1 liter.',
    'qt->l': 'Quarts and liters are almost the same (1 qt is about 0.95 L).',
  },
};

export function getMentalMathTip(
  categoryId: CategoryId,
  fromUnitId: string,
  toUnitId: string
): string | undefined {
  return mentalMathTips[categoryId]?.[`${fromUnitId}->${toUnitId}`];
}
