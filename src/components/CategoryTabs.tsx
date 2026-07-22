import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Category, CategoryId } from '../types';
import { colors, radius, spacing } from '../theme';

interface Props {
  categories: Category[];
  selectedCategoryId: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export function CategoryTabs({ categories, selectedCategoryId, onSelectCategory }: Props) {
  return (
    <View style={styles.container}>
      {categories.map((category) => {
        const selected = category.id === selectedCategoryId;
        return (
          <Pressable
            key={category.id}
            style={[styles.tab, selected && styles.tabSelected]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text style={[styles.tabLabel, selected && styles.tabLabelSelected]}>
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  tabSelected: {
    backgroundColor: colors.accent,
  },
  tabLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  tabLabelSelected: {
    color: colors.text,
  },
});
