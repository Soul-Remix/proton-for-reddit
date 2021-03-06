import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '@/components';
import { FeedSortModal, PageSortModal } from '@/features/sort';
import { useModal, useTheme } from '@/hooks';
import { useSearchStore } from '@/stores';

interface Props {
  navigation: any;
  page: string;
}

export function TabNavigatorButtons({ navigation, page }: Props) {
  const theme = useTheme();
  const { isModalOpen, openModal, closeModal } = useModal();
  const setSearch = useSearchStore((state) => state.setSearch);

  const handleSearchPress = () => {
    setSearch('');
    navigation.navigate('Search');
  };
  return (
    <>
      <View style={styles.row}>
        <IconButton
          color={theme.text}
          icon="magnify"
          style={styles.icon}
          onPress={handleSearchPress}
        />
        <IconButton
          color={theme.text}
          icon="sort-variant"
          onPress={openModal}
        />
      </View>
      {page === 'home' ? (
        <FeedSortModal visible={isModalOpen} onClose={closeModal} />
      ) : (
        <PageSortModal visible={isModalOpen} onClose={closeModal} page={page} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  icon: { marginRight: 16 },
});
