import { ReactNode } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { StoredPair } from '../types';
import { getCategory, getUnit } from '../data/units';
import { colors, radius, spacing } from '../theme';

interface Props {
  visible: boolean;
  title: string;
  items: StoredPair[];
  emptyText: string;
  onClose: () => void;
  onSelectItem: (pair: StoredPair) => void;
  renderRight?: (pair: StoredPair) => ReactNode;
  headerAction?: ReactNode;
}

export function PairListModal({
  visible,
  title,
  items,
  emptyText,
  onClose,
  onSelectItem,
  renderRight,
  headerAction,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {headerAction}
          </View>
          {items.length === 0 ? (
            <Text style={styles.emptyText}>{emptyText}</Text>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(pair) => pair.id}
              renderItem={({ item }) => {
                const category = getCategory(item.categoryId);
                const fromUnit = getUnit(item.categoryId, item.fromUnitId);
                const toUnit = getUnit(item.categoryId, item.toUnitId);
                return (
                  <Pressable style={styles.row} onPress={() => onSelectItem(item)}>
                    <View style={styles.rowText}>
                      <Text style={styles.rowLabel}>
                        {fromUnit.label} → {toUnit.label}
                      </Text>
                      <Text style={styles.rowSubLabel}>{category.label}</Text>
                    </View>
                    {renderRight?.(item)}
                  </Pressable>
                );
              }}
            />
          )}
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
    minHeight: 160,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    paddingVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  rowText: {
    flex: 1,
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
