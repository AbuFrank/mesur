import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Unit } from '../types';
import { UnitPickerModal } from './UnitPickerModal';
import { colors, radius, spacing } from '../theme';

interface Props {
  pickerTitle: string;
  units: Unit[];
  selectedUnit: Unit;
  value: string;
  onChangeValue: (text: string) => void;
  onSelectUnit: (unitId: string) => void;
  editable?: boolean;
}

export function UnitInput({
  pickerTitle,
  units,
  selectedUnit,
  value,
  onChangeValue,
  onSelectUnit,
  editable = true,
}: Props) {
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeValue}
        keyboardType="default"
        placeholder="0"
        placeholderTextColor={colors.textMuted}
        editable={editable}
      />
      <Pressable style={styles.unitChip} onPress={() => setPickerVisible(true)}>
        <Text style={styles.unitLabel}>{selectedUnit.label}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
      </Pressable>
      <UnitPickerModal
        visible={pickerVisible}
        title={pickerTitle}
        units={units}
        selectedUnitId={selectedUnit.id}
        onSelect={onSelectUnit}
        onClose={() => setPickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 28,
    color: colors.text,
    paddingVertical: spacing.xs,
  },
  unitChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    marginLeft: spacing.sm,
  },
  unitLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
});
