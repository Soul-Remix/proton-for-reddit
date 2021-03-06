import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@/hooks';
import {
  Awards,
  CardFooter,
  CardMain,
  CardTitle,
  FlairList,
  PostHeader,
} from '../components';
import { useSettingsStore } from '@/stores';
import { ColorsDTO } from '@/stores/types';
import { Post } from '../types';

interface Props {
  post: Post;
  page?: boolean;
}

function Card({ post, page }: Props) {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const postSettings = useSettingsStore((state) => state.posts);

  const openLink = () => {
    WebBrowser.openBrowserAsync(post.url);
  };

  const openRedditLink = () => {
    WebBrowser.openBrowserAsync(`https://www.reddit.com${post.permalink}`);
  };

  const handlePress = () => {
    if (page) {
      navigation.navigate('Comments', { post });
    }
  };

  return (
    <Pressable
      style={page ? styles.card : styles.cardRough}
      onPress={handlePress}
      android_ripple={page ? styles.ripple : null}
    >
      <PostHeader
        subName={post.subreddit_name_prefixed}
        subIcon={post?.sr_detail?.community_icon || post?.sr_detail?.icon_img}
        author={post.author}
        createdAt={post.created_utc}
        sub={post.subreddit}
        isLocked={post.locked}
      />
      <CardTitle
        title={post.title}
        thumbnail={post.thumbnail}
        showThumbnail={
          post.post_hint === 'link' && post.domain !== 'i.imgur.com'
        }
        onPressThumbnail={openLink}
        domain={post.domain}
        showDomain={
          post.domain !== 'i.redd.it' &&
          post.domain !== 'v.redd.it' &&
          !post.domain.includes('self.')
        }
        sticky={post.stickied}
      />
      {postSettings.awards && <Awards awards={post.all_awardings} />}
      {postSettings.flairs && (
        <FlairList
          tag={post.link_flair_text}
          bgColor={post.link_flair_background_color}
          color={post.link_flair_text_color}
          isNsfw={post.over_18}
        />
      )}
      <CardMain
        selftext={post.selftext}
        hint={post.post_hint}
        preview={post.preview}
        media={post.media}
        isGallery={post.is_gallery}
        mediaMetadata={post.media_metadata}
        isVideo={post.is_video}
        url={post.url}
        openLink={openLink}
        fullText={!page}
        isNsfw={post.over_18}
        isRedditDomain={post.is_reddit_media_domain}
        removed={post.removed_by_category !== null}
      />
      <CardFooter
        numLikes={post.ups}
        numComments={post.num_comments}
        likes={post.likes}
        saved={post.saved}
        postName={post.name}
        openLink={openRedditLink}
      />
    </Pressable>
  );
}

export const PostCard = React.memo(Card, () => false);

const makeStyles = (theme: ColorsDTO) =>
  StyleSheet.create({
    card: {
      width: '100%',
      elevation: 2,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.1,
      marginVertical: 6,
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: theme.surface,
      shadowColor: theme.backdrop,
    },
    cardRough: {
      width: '100%',
      elevation: 2,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.1,
      overflow: 'hidden',
      backgroundColor: theme.surface,
      shadowColor: theme.backdrop,
    },
    ripple: { color: theme.placeholder },
  });
