import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Dimensions } from "react-native";
import { CardText } from "../CardText/CardText";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import { PostImage } from "../PostImage/PostImage";
import { VideoImage } from "../VideoImage/VideoImage";
import { YoutubeImage } from "../YoutubeImage/YoutubeImage";

interface Props {
  post: any;
  openLink: () => void;
  fullText?: boolean;
}

export const CardMain = ({ post, openLink, fullText }: Props) => {
  const navigation = useNavigation<any>();

  if (post.selftext) {
    return <CardText text={post.selftext} fullText={fullText} />;
  }

  if (post.post_hint === "image") {
    const image = post.preview.images[0].source;

    if (post.preview.images[0].variants.mp4) {
      const media = post.preview.images[0].variants.mp4.source;
      return (
        <VideoImage
          url={image.url}
          width={media.width}
          height={media.height}
          onPress={() =>
            navigation.navigate("Video", {
              videoUrl: media.url,
              imageUrl: image.url,
            })
          }
        />
      );
    }

    return (
      <PostImage url={image.url} width={image.width} height={image.height} />
    );
  }

  if (post.is_gallery) {
    const imgArr = Object.values(post.media_metadata);
    return <ImageCarousel images={imgArr} />;
  }

  if (post.post_hint === "rich:video") {
    if (post.preview.reddit_video_preview) {
      const media = post.preview.reddit_video_preview;
      const image = post.preview.images[0].source.url;
      return (
        <VideoImage
          url={image}
          width={media.width}
          height={media.height}
          onPress={() =>
            navigation.navigate("Video", {
              videoUrl: media.fallback_url,
            })
          }
        />
      );
    }

    if (post.media.oembed) {
      const media = post.media.oembed;
      return (
        <YoutubeImage
          url={media.thumbnail_url}
          width={media.thumbnail_width}
          height={media.thumbnail_height}
          onPress={openLink}
        />
      );
    }
  }

  if (post.post_hint === "link" && post.preview.reddit_video_preview) {
    const media = post.preview.reddit_video_preview;
    const image = post.preview.images[0].source.url;
    return (
      <VideoImage
        url={image}
        width={media.width}
        height={media.height}
        onPress={() =>
          navigation.navigate("Video", {
            videoUrl: media.fallback_url,
          })
        }
      />
    );
  }

  if (post.url.slice(-3) === "mp4") {
    return (
      <VideoImage
        url={""}
        width={Dimensions.get("screen").width}
        height={250}
        onPress={() =>
          navigation.navigate("Video", {
            videoUrl: post.url,
          })
        }
      />
    );
  }

  if (post.is_video) {
    const media = post.media.reddit_video;

    const image = post.preview.images[0].source;
    return (
      <VideoImage
        url={image.url}
        width={media.width}
        height={media.height}
        onPress={() =>
          navigation.navigate("Video", {
            videoUrl: media.fallback_url,
            imageUrl: image.url,
          })
        }
      />
    );
  }

  return null;
};
