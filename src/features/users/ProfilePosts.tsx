import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { useGetUserPosts } from '@/features/users/api';
import {
  ErrorEmpty,
  ErrorFetchingMore,
  ErrorLoading,
  Indicator,
} from '@/components';
import { PostCard } from '@/features/posts';

interface Props {
  name: string;
}

export function ProfilePosts({ name }: Props) {
  const query = useGetUserPosts(name);
  const flatlistRef = useRef<any>();
  const [refreshing, setIsRefreshing] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (refreshing) {
      if (query.isRefetching === false) {
        setIsRefreshing(false);
      }
    }
  }, [query.isRefetching, refreshing]);

  const flatListFooter = () => {
    if (query.isFetchingNextPage) {
      return <Indicator />;
    }
    if (query.isError && query.data) {
      return (
        <ErrorFetchingMore
          disabled={query.isFetchingNextPage}
          onPress={() => {
            query.fetchNextPage();
          }}
        />
      );
    }
    return null;
  };

  const flatlistEmpty = () => {
    if (query.isLoading || query.isFetching) {
      return <Indicator />;
    }
    return <ErrorEmpty onPress={() => query.refetch()} />;
  };

  const flatListOnEnd = () => {
    if (
      !query.isFetchingNextPage &&
      !query.isFetching &&
      !query.isError &&
      query.hasNextPage
    ) {
      query.fetchNextPage();
    }
  };

  const flatListOnRefresh = useCallback(() => {
    setIsRefreshing(true);
    query.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItemMemoized = useCallback(
    ({ item }) => <PostCard post={item.data} page />,
    []
  );

  if (query.isError && !query.data) {
    return (
      <ErrorLoading
        onPress={() => {
          query.refetch();
        }}
      />
    );
  }

  return (
    <Tabs.FlatList
      ref={flatlistRef}
      renderItem={renderItemMemoized}
      data={query.posts}
      keyExtractor={(item) => item.data.id}
      style={{ width }}
      onEndReachedThreshold={0.5}
      onEndReached={flatListOnEnd}
      ListFooterComponent={flatListFooter}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={flatListOnRefresh}
      ListEmptyComponent={flatlistEmpty}
    />
  );
}
