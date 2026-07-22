import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category, Unit } from '../types';
import { UnitInput } from './UnitInput';
import { SwapButton } from './SwapButton';
import { getMentalMathTip } from '../data/mentalMathTips';
import { colors, radius, spacing } from '../theme';

interface Props {
  category: Category;
  leftUnit: Unit;
  rightUnit: Unit;
  leftValue: string;
  rightValue: string;
  onChangeLeftValue: (text: string) => void;
  onChangeRightValue: (text: string) => void;
  onSelectLeftUnit: (unitId: string) => void;
  onSelectRightUnit: (unitId: string) => void;
  onSwap: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ConverterCard({
  category,
  leftUnit,
  rightUnit,
  leftValue,
  rightValue,
  onChangeLeftValue,
  onChangeRightValue,
  onSelectLeftUnit,
  onSelectRightUnit,
  onSwap,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const tip = getMentalMathTip(category.id, leftUnit.id, rightUnit.id);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Pressable style={styles.favoriteButton} onPress={onToggleFavorite} hitSlop={8}>
          <Ionicons
            name={isFavorite ? 'star' : 'star-outline'}
            size={22}
            color={isFavorite ? colors.star : colors.textMuted}
          />
        </Pressable>
      </View>

      <UnitInput
        pickerTitle={`${category.label} units`}
        units={category.units}
        selectedUnit={leftUnit}
        value={leftValue}
        onChangeValue={onChangeLeftValue}
        onSelectUnit={onSelectLeftUnit}
      />

      <SwapButton onPress={onSwap} />

      <UnitInput
        pickerTitle={`${category.label} units`}
        units={category.units}
        selectedUnit={rightUnit}
        value={rightValue}
        onChangeValue={onChangeRightValue}
        onSelectUnit={onSelectRightUnit}
      />

      {tip && (
        <View style={styles.tip}>
          <Ionicons name="bulb-outline" size={16} color={colors.textMuted} />
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: spacing.sm,
  },
  favoriteButton: {
    padding: spacing.xs,
    margin: -spacing.xs,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  tipText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
});
