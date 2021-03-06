import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Flair } from './Flair';

interface Props {
  tag: string | undefined;
  bgColor: string;
  color: string;
  isNsfw: boolean;
}

// const regExp = /rich:|hosted:/g;
// const emojiReg = /:(\w*):/g;

export function FlairList({ tag, bgColor, color, isNsfw }: Props) {
  // const newTag = tag?.replace(emojiReg, "").trim();
  return (
    <View style={styles.container}>
      {tag && <Flair tag={tag} bgColor={bgColor} color={color} />}
      {isNsfw && <Flair tag="NSFW" bgColor="#e52d27" color="light" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
