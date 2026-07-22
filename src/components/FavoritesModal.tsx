import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StoredPair } from '../types';
import { PairListModal } from './PairListModal';
import { colors } from '../theme';

interface Props {
  visible: boolean;
  favorites: StoredPair[];
  onClose: () => void;
  onSelectPair: (pair: StoredPair) => void;
  onUnfavorite: (pair: StoredPair) => void;
}

export function FavoritesModal({ visible, favorites, onClose, onSelectPair, onUnfavorite }: Props) {
  return (
    <PairListModal
      visible={visible}
      title="Favorites"
      items={favorites}
      emptyText="No favorites yet. Tap the star on a conversion to save it."
      onClose={onClose}
      onSelectItem={onSelectPair}
      renderRight={(pair) => (
        <Pressable onPress={() => onUnfavorite(pair)} hitSlop={8}>
          <Ionicons name="star" size={20} color={colors.star} />
        </Pressable>
      )}
    />
  );
}
