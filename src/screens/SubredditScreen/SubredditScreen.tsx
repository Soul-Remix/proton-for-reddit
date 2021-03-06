import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  ErrorEmpty,
  ErrorFetchingMore,
  ErrorLoading,
  Indicator,
} from '@/components';
import { PostCard } from '@/features/posts';
import { useGetFeed } from '@/features/posts/api';
import { useSettingsStore } from '@/stores';
import { SubHeader } from '@/features/sub/components/SubHeader';
import { useGetSubAbout } from '@/features/sub/api';

interface Props {
  route: any;
}

export function SubredditScreen({ route }: Props) {
  const { sub, subIcon } = route.params;
  const flatlistRef = useRef<any>();
  const sort = useSettingsStore((state) => state.posts.sort);
  const postsQuery = useGetFeed(sub, sort);
  const aboutQuery = useGetSubAbout(sub);
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing && !postsQuery.isRefetching) {
      setIsRefreshing(false);
    }
  }, [postsQuery.isRefetching, refreshing]);

  const flatListFooter = () => {
    if (postsQuery.isFetchingNextPage) {
      return <Indicator />;
    }
    if (postsQuery.isError && postsQuery.data) {
      return (
        <ErrorFetchingMore
          disabled={postsQuery.isFetchingNextPage}
          onPress={() => {
            postsQuery.fetchNextPage();
          }}
        />
      );
    }
    return null;
  };

  const flatListHeader = () => (
    <SubHeader
      name={aboutQuery.data?.display_name || sub}
      icon={
        aboutQuery.data?.community_icon || aboutQuery.data?.icon_img || subIcon
      }
      active={aboutQuery.data?.accounts_active}
      subscriber={aboutQuery.data?.subscribers}
      description={aboutQuery.data?.public_description}
      subscribed={aboutQuery.data?.user_is_subscriber}
      id={aboutQuery.data?.name}
    />
  );

  const flatlistEmpty = () => {
    if (postsQuery.isLoading || postsQuery.isFetching) {
      return <Indicator />;
    }
    return <ErrorEmpty onPress={() => postsQuery.refetch()} />;
  };

  const flatListOnRefresh = useCallback(() => {
    setIsRefreshing(true);
    postsQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flatListOnEnd = () => {
    if (
      !postsQuery.isFetchingNextPage &&
      !postsQuery.isFetching &&
      !postsQuery.isError &&
      postsQuery.hasNextPage
    ) {
      postsQuery.fetchNextPage();
    }
  };

  const renderItemMemoized = useCallback(
    ({ item }) => <PostCard post={item.data} page />,
    []
  );

  if (postsQuery.isError && !postsQuery.data) {
    return (
      <ErrorLoading
        onPress={() => {
          postsQuery.refetch();
        }}
      />
    );
  }

  return (
    <FlatList
      ref={flatlistRef}
      renderItem={renderItemMemoized}
      data={postsQuery.posts}
      keyExtractor={(item) => item.data.id}
      style={styles.flatlist}
      onEndReachedThreshold={10}
      onEndReached={flatListOnEnd}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={flatListOnRefresh}
      ListFooterComponent={flatListFooter}
      ListHeaderComponent={flatListHeader}
      ListEmptyComponent={flatlistEmpty}
    />
  );

  return null;
}

const styles = StyleSheet.create({
  headerSpinner: { flex: 1, paddingTop: 40 },
  headerContainer: { flex: 1 },
  flatlist: {
    width: '100%',
  },
});
