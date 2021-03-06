import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Dimensions } from 'react-native';
import { useFilterStore, useSettingsStore } from '@/stores';
import { CardText } from '../CardText/CardText';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';
import { PostImage } from '../PostImage/PostImage';
import { ImageWithIcon } from '../ImageWithIcon/ImageWithIcon';
import { YoutubeImage } from '../YoutubeImage/YoutubeImage';
import { MediaDto, PreviewDTO } from '../../types';
import { PostRemovedText } from '../PostRemovedText/PostRemovedText';

interface Props {
  selftext: string;
  hint?: string;
  preview: PreviewDTO;
  media: MediaDto | null;
  isGallery: boolean;
  mediaMetadata: any;
  isVideo: boolean;
  url: string;
  fullText?: boolean;
  isNsfw: boolean;
  isRedditDomain: boolean;
  removed: boolean;
  openLink: () => void;
}

const regex = /\/DASH(.*)$/g;

export function CardMainComponent({
  selftext,
  hint,
  preview,
  media,
  isGallery,
  mediaMetadata,
  isVideo,
  url,
  fullText,
  isNsfw,
  isRedditDomain,
  removed,
  openLink,
}: Props) {
  const navigation = useNavigation<any>();
  const dataSaver = useSettingsStore((state) => state.dataSaver);
  const blurNsfw = useFilterStore((state) => state.posts.blurNsfw);
  const carousel = useSettingsStore((state) => state.card.carousel);
  const previewText = useSettingsStore((state) => state.card.previewText);

  const handleImageChoice = () => {
    if (!preview) {
      return { url: null, width: 0, height: 0 };
    }

    let image = preview.images[0].source;

    if (dataSaver) {
      image =
        preview.images[0].resolutions[1] || preview.images[0].resolutions[0];
    }
    if (isNsfw && blurNsfw) {
      image = preview.images[0].variants.obfuscated.source;
    }
    if (isNsfw && blurNsfw && dataSaver) {
      image =
        preview.images[0].variants.obfuscated.resolutions[1] ||
        preview.images[0].variants.obfuscated.resolutions[0];
    }
    return image;
  };

  if (removed && fullText) {
    return <PostRemovedText />;
  }

  if (selftext && previewText) {
    return <CardText text={selftext} fullText={fullText} />;
  }

  if (hint === 'image' && !isGallery) {
    const image = handleImageChoice();

    if (!image.url) {
      return null;
    }

    if (preview.images[0].variants.mp4) {
      let media = preview.images[0].variants.mp4.source;
      if (dataSaver) {
        media =
          preview.images[0].variants.mp4.resolutions[1] ||
          preview.images[0].variants.mp4.resolutions[0] ||
          preview.images[0].variants.mp4.source;
      }
      return (
        <ImageWithIcon
          url={image.url}
          width={media.width}
          height={media.height}
          onPress={() => navigation.navigate('Video', { videoUrl: media.url })}
        />
      );
    }

    return (
      <PostImage
        url={image.url}
        width={image.width}
        height={image.height}
        onPress={() => {
          navigation.navigate('Images', {
            images: [preview.images[0].source],
          });
        }}
      />
    );
  }

  if (isGallery) {
    const imgSourceArr: any = [];
    if (!mediaMetadata) {
      return null;
    }
    const gallery = Object.values(mediaMetadata) as any;
    if (!gallery[0].s) {
      return null;
    }

    const singleImage = {
      url: gallery[0].s.u,
      width: gallery[0].s.x,
      height: gallery[0].s.y,
    };

    const imgArr = gallery.map((item: any) => {
      let image = item.s;

      imgSourceArr.push({ url: image.u, width: image.x, height: image.y });
      if (dataSaver) {
        image = item.p[1] || item.p[0];
      }
      if (isNsfw && blurNsfw) {
        // eslint-disable-next-line prefer-destructuring
        image = item.o[0];
      }
      return { url: image.u, width: image.x, height: image.y };
    });

    const handlePress = () => {
      navigation.navigate('Images', { images: imgSourceArr });
    };

    if (carousel) {
      return <ImageCarousel images={imgArr} onPress={handlePress} />;
    }
    return (
      <ImageWithIcon
        url={singleImage.url}
        width={singleImage.width}
        height={singleImage.height}
        icon="image-multiple-outline"
        onPress={handlePress}
      />
    );
  }

  if (isVideo && media) {
    const video = media.reddit_video;

    const image = handleImageChoice();

    if (!image.url || !video.dash_url) {
      return null;
    }

    return (
      <ImageWithIcon
        url={image.url}
        width={video.width}
        height={video.height}
        onPress={() =>
          navigation.navigate('Video', {
            metaUrl: video.dash_url,
            baseUrl: video.fallback_url.replace(regex, ''),
          })
        }
      />
    );
  }

  if (hint === 'rich:video') {
    if (preview.reddit_video_preview) {
      const video = preview.reddit_video_preview;
      const image = handleImageChoice();
      if (!image.url) {
        return null;
      }
      return (
        <ImageWithIcon
          url={image.url}
          width={video.width}
          height={video.height}
          onPress={() =>
            navigation.navigate('Video', {
              metaUrl: video.dash_url,
              baseUrl: video.fallback_url.replace(regex, ''),
            })
          }
        />
      );
    }

    if (media && media.oembed) {
      const image = media.oembed;
      return (
        <YoutubeImage
          url={image.thumbnail_url}
          width={image.thumbnail_width}
          height={image.thumbnail_height}
          onPress={openLink}
        />
      );
    }
  }

  if (hint === 'link' && preview.reddit_video_preview) {
    const video = preview.reddit_video_preview;
    const image = handleImageChoice();
    if (!image.url) {
      return null;
    }
    return (
      <ImageWithIcon
        url={image.url}
        width={video.width}
        height={video.height}
        onPress={() =>
          navigation.navigate('Video', {
            metaUrl: video.dash_url,
            baseUrl: video.fallback_url.replace(regex, ''),
          })
        }
      />
    );
  }

  if (isRedditDomain && url.slice(-3) === 'jpg') {
    return (
      <PostImage
        url={url}
        width={1000}
        height={600}
        onPress={() => {
          navigation.navigate('Images', {
            images: [{ url, width: 1000, height: 600 }],
          });
        }}
      />
    );
  }

  if (url.slice(-3) === 'mp4') {
    return (
      <ImageWithIcon
        url=""
        width={Dimensions.get('screen').width}
        height={250}
        onPress={() =>
          navigation.navigate('Video', {
            videoUrl: url,
          })
        }
      />
    );
  }

  return null;
}

export const CardMain = React.memo(CardMainComponent, () => false);
