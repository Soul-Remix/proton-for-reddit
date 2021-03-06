import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFetchVideo, Video } from '@/features/video';
import { useSettingsStore } from '@/stores';
import { Spinner } from '@/components';

export function VideoScreen({ route }: any) {
  const { metaUrl, baseUrl, videoUrl } = route.params;
  const videoSettings = useSettingsStore((state) => state.videos);

  const { audioId, videoIds, isLoading } = useFetchVideo(metaUrl);

  return (
    <SafeAreaView style={styles.cotainer}>
      {isLoading && <Spinner animating={isLoading} />}
      {!isLoading && (
        <Video
          videoUrl={
            videoUrl || (videoSettings.dataSaver
              ? `${baseUrl}/${videoIds[0].url}`
              : `${baseUrl}/${videoIds[videoIds.length - 1].url}`)
          }
          audioUrl={audioId ? `${baseUrl}/${audioId}` : undefined}
          loop={videoSettings.loop}
          mute={videoSettings.mute}
          qualities={videoIds}
          baseUrl={baseUrl}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'black',
  },
  video: { width: '100%', height: '100%' },
});
