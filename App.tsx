import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { categories } from './src/data/units';
import { useConverter } from './src/hooks/useConverter';
import { useRecents } from './src/hooks/useRecents';
import { useFavorites } from './src/hooks/useFavorites';
import { useDebouncedEffect } from './src/hooks/useDebouncedEffect';
import { parseNumericInput } from './src/utils/convert';
import { StoredPair } from './src/types';

import { CategoryTabs } from './src/components/CategoryTabs';
import { ConverterCard } from './src/components/ConverterCard';
import { RecentsModal } from './src/components/RecentsModal';
import { FavoritesModal } from './src/components/FavoritesModal';
import { colors, radius, spacing } from './src/theme';

export default function App() {
  const converter = useConverter();
  const { recents, addRecent, clearRecents } = useRecents();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [recentsVisible, setRecentsVisible] = useState(false);
  const [favoritesVisible, setFavoritesVisible] = useState(false);

  const didMount = useRef(false);

  // Record recents immediately when the unit pair changes.
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    addRecent(converter.categoryId, converter.leftUnit.id, converter.rightUnit.id);
  }, [converter.categoryId, converter.leftUnit.id, converter.rightUnit.id, addRecent]);

  // Record recents after a pause in typing, only if the value is a real number.
  useDebouncedEffect(
    () => {
      if (parseNumericInput(converter.leftValue) === null) return;
      addRecent(converter.categoryId, converter.leftUnit.id, converter.rightUnit.id);
    },
    [converter.leftValue, converter.rightValue],
    800
  );

  const handleSelectPair = (pair: StoredPair) => {
    converter.loadPair(pair.categoryId, pair.fromUnitId, pair.toUnitId);
    setRecentsVisible(false);
    setFavoritesVisible(false);
  };

  const currentIsFavorite = isFavorite(converter.categoryId, converter.leftUnit.id, converter.rightUnit.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.appTitle}>Mesur</Text>

        <CategoryTabs
          categories={categories}
          selectedCategoryId={converter.categoryId}
          onSelectCategory={converter.setCategoryId}
        />

        <ConverterCard
          category={converter.category}
          leftUnit={converter.leftUnit}
          rightUnit={converter.rightUnit}
          leftValue={converter.leftValue}
          rightValue={converter.rightValue}
          onChangeLeftValue={converter.setLeftValue}
          onChangeRightValue={converter.setRightValue}
          onSelectLeftUnit={converter.setLeftUnitId}
          onSelectRightUnit={converter.setRightUnitId}
          onSwap={converter.swap}
          isFavorite={currentIsFavorite}
          onToggleFavorite={() =>
            toggleFavorite(converter.categoryId, converter.leftUnit.id, converter.rightUnit.id)
          }
        />

        <View style={styles.actionRow}>
          <Pressable style={styles.actionButton} onPress={() => setRecentsVisible(true)}>
            <Ionicons name="time-outline" size={18} color={colors.text} />
            <Text style={styles.actionLabel}>Most Recent</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => setFavoritesVisible(true)}>
            <Ionicons name="star-outline" size={18} color={colors.text} />
            <Text style={styles.actionLabel}>Favorites</Text>
          </Pressable>
        </View>
      </ScrollView>

      <RecentsModal
        visible={recentsVisible}
        recents={recents}
        onClose={() => setRecentsVisible(false)}
        onSelectPair={handleSelectPair}
        onClear={clearRecents}
      />
      <FavoritesModal
        visible={favoritesVisible}
        favorites={favorites}
        onClose={() => setFavoritesVisible(false)}
        onSelectPair={handleSelectPair}
        onUnfavorite={(pair) => toggleFavorite(pair.categoryId, pair.fromUnitId, pair.toUnitId)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  appTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 2,
  },
  actionLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});
