import { useCallback, useMemo, useState } from 'react';
import { CategoryId } from '../types';
import { getCategory, getUnit } from '../data/units';
import { getCommonPairUnitId } from '../data/commonPairs';
import { convert, parseNumericInput } from '../utils/convert';
import { formatResult } from '../utils/format';

interface ConverterState {
  categoryId: CategoryId;
  leftUnitId: string;
  rightUnitId: string;
  leftValue: string;
  rightValue: string;
}

function defaultStateForCategory(categoryId: CategoryId): ConverterState {
  const category = getCategory(categoryId);
  const allUnitIds = category.units.map((u) => u.id);
  const leftUnitId = allUnitIds[0];
  const rightUnitId = getCommonPairUnitId(categoryId, leftUnitId, allUnitIds);
  const leftValue = '1';
  const rightValue = formatResult(
    convert(1, getUnit(categoryId, leftUnitId), getUnit(categoryId, rightUnitId))
  );
  return { categoryId, leftUnitId, rightUnitId, leftValue, rightValue };
}

export function useConverter() {
  const [state, setState] = useState<ConverterState>(() =>
    defaultStateForCategory('length')
  );

  const category = useMemo(() => getCategory(state.categoryId), [state.categoryId]);
  const leftUnit = useMemo(
    () => getUnit(state.categoryId, state.leftUnitId),
    [state.categoryId, state.leftUnitId]
  );
  const rightUnit = useMemo(
    () => getUnit(state.categoryId, state.rightUnitId),
    [state.categoryId, state.rightUnitId]
  );

  const setCategoryId = useCallback((categoryId: CategoryId) => {
    setState(defaultStateForCategory(categoryId));
  }, []);

  const setLeftUnitId = useCallback((unitId: string) => {
    setState((prev) => {
      const allUnitIds = getCategory(prev.categoryId).units.map((u) => u.id);
      const rightUnitId = getCommonPairUnitId(prev.categoryId, unitId, allUnitIds);
      const parsed = parseNumericInput(prev.leftValue);
      const rightValue =
        parsed === null
          ? prev.rightValue
          : formatResult(
              convert(parsed, getUnit(prev.categoryId, unitId), getUnit(prev.categoryId, rightUnitId))
            );
      return { ...prev, leftUnitId: unitId, rightUnitId, rightValue };
    });
  }, []);

  const setRightUnitId = useCallback((unitId: string) => {
    setState((prev) => {
      const parsed = parseNumericInput(prev.leftValue);
      const rightValue =
        parsed === null
          ? prev.rightValue
          : formatResult(
              convert(parsed, getUnit(prev.categoryId, prev.leftUnitId), getUnit(prev.categoryId, unitId))
            );
      return { ...prev, rightUnitId: unitId, rightValue };
    });
  }, []);

  const setLeftValue = useCallback((text: string) => {
    setState((prev) => {
      const parsed = parseNumericInput(text);
      const rightValue =
        parsed === null
          ? prev.rightValue
          : formatResult(
              convert(parsed, getUnit(prev.categoryId, prev.leftUnitId), getUnit(prev.categoryId, prev.rightUnitId))
            );
      return { ...prev, leftValue: text, rightValue };
    });
  }, []);

  const setRightValue = useCallback((text: string) => {
    setState((prev) => {
      const parsed = parseNumericInput(text);
      const leftValue =
        parsed === null
          ? prev.leftValue
          : formatResult(
              convert(parsed, getUnit(prev.categoryId, prev.rightUnitId), getUnit(prev.categoryId, prev.leftUnitId))
            );
      return { ...prev, rightValue: text, leftValue };
    });
  }, []);

  const swap = useCallback(() => {
    setState((prev) => ({
      ...prev,
      leftUnitId: prev.rightUnitId,
      rightUnitId: prev.leftUnitId,
      leftValue: prev.rightValue,
      rightValue: prev.leftValue,
    }));
  }, []);

  const loadPair = useCallback((categoryId: CategoryId, fromUnitId: string, toUnitId: string) => {
    setState((prev) => {
      const leftValue = parseNumericInput(prev.leftValue) === null ? '1' : prev.leftValue;
      const parsed = parseNumericInput(leftValue) ?? 1;
      const rightValue = formatResult(
        convert(parsed, getUnit(categoryId, fromUnitId), getUnit(categoryId, toUnitId))
      );
      return { categoryId, leftUnitId: fromUnitId, rightUnitId: toUnitId, leftValue, rightValue };
    });
  }, []);

  return {
    categoryId: state.categoryId,
    category,
    leftUnit,
    rightUnit,
    leftValue: state.leftValue,
    rightValue: state.rightValue,
    setCategoryId,
    setLeftUnitId,
    setRightUnitId,
    setLeftValue,
    setRightValue,
    swap,
    loadPair,
  };
}
