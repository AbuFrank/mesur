import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Unit } from '../types';
import { colors, radius, spacing } from '../theme';

interface Props {
  visible: boolean;
  title: string;
  units: Unit[];
  selectedUnitId: string;
  onSelect: (unitId: string) => void;
  onClose: () => void;
}

export function UnitPickerModal({ visible, title, units, selectedUnitId, onSelect, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{title}</Text>
          <FlatList
            data={units}
            keyExtractor={(unit) => unit.id}
            renderItem={({ item }) => {
              const selected = item.id === selectedUnitId;
              return (
                <Pressable
                  style={[styles.row, selected && styles.rowSelected]}
                  onPress={() => {
                    onSelect(item.id);
                    onClose();
                  }}
                >
                  <View>
                    <Text style={styles.rowLabel}>{item.label}</Text>
                    <Text style={styles.rowSubLabel}>{item.fullName}</Text>
                  </View>
                  {selected && <Ionicons name="checkmark" size={20} color={colors.accent} />}
                </Pressable>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.md,
    maxHeight: '70%',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  rowSelected: {
    backgroundColor: colors.accentMuted,
  },
  rowLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  rowSubLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
});
