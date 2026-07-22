import { Pressable, StyleSheet, Text } from 'react-native';
import { StoredPair } from '../types';
import { PairListModal } from './PairListModal';
import { colors } from '../theme';

interface Props {
  visible: boolean;
  recents: StoredPair[];
  onClose: () => void;
  onSelectPair: (pair: StoredPair) => void;
  onClear: () => void;
}

export function RecentsModal({ visible, recents, onClose, onSelectPair, onClear }: Props) {
  return (
    <PairListModal
      visible={visible}
      title="Recent conversions"
      items={recents}
      emptyText="No recent conversions yet."
      onClose={onClose}
      onSelectItem={onSelectPair}
      headerAction={
        recents.length > 0 ? (
          <Pressable onPress={onClear} hitSlop={8}>
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  clearText: {
    color: colors.textMuted,
    fontSize: 13,
  },
});
