/* eslint-disable no-param-reassign */
import create from 'zustand';
import produce from 'immer';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreProps {
  notifications: {
    enabled: boolean;
    interval: {
      value: number;
      text: string;
    };
  };
  dataSaver: boolean;
  videos: {
    mute: boolean;
    loop: boolean;
    dataSaver: boolean;
  };
  posts: {
    feedSort: string;
    sort: string;
    author: boolean;
    tapSub: boolean;
    tapUser: boolean;
    awards: boolean;
    flairs: boolean;
    markRead: boolean;
    hideRead: boolean;
    subIcon: boolean;
  };
  comments: {
    sort: string;
    avatar: boolean;
    buttonsVisible: boolean;
    highlightName: boolean;
    awards: boolean;
    tapAwards: boolean;
    flairs: boolean;
  };
  card: {
    carousel: boolean;
    previewText: boolean;
  };
  setNotifications: () => void;
  setNotificationsInterval: (text: string, value: number) => void;
  setDataSaver: () => void;
  setVideoSettings: (type: string) => void;
  setPostSort: (val: string, type: 'sort' | 'feedSort') => void;
  setPostSettings: (type: string) => void;
  setCommentSort: (val: string) => void;
  setCommentSettings: (type: string) => void;
  setCardSettings: (type: string) => void;
}

export const useSettingsStore = create<StoreProps>(
  persist(
    (set, get) => ({
      notifications: {
        enabled: true,
        interval: {
          value: 10000,
          text: '1 Sec',
        },
      },
      setNotifications: () =>
        set(
          produce((state) => {
            state.notifications.enabled = !state.notifications.enabled;
          })
        ),
      setNotificationsInterval: (text, value) =>
        set(
          produce((state) => {
            state.notifications.interval.text = text;
            state.notifications.interval.value = value;
          })
        ),

      dataSaver: true,
      setDataSaver: () => set((state) => ({ dataSaver: !state.dataSaver })),

      videos: {
        mute: false,
        loop: true,
        dataSaver: true,
      },
      setVideoSettings: (type) =>
        set(
          produce((state) => {
            state.videos[type] = !state.videos[type];
          })
        ),

      posts: {
        feedSort: 'top',
        sort: 'top',
        author: true,
        tapSub: true,
        tapUser: true,
        awards: true,
        flairs: true,
        markRead: true,
        hideRead: false,
        subIcon: true,
      },
      setPostSort: (value, type) =>
        set(
          produce((state) => {
            state.posts[type] = value;
          })
        ),
      setPostSettings: (type) =>
        set(
          produce((state) => {
            state.posts[type] = !state.posts[type];
          })
        ),

      comments: {
        sort: 'hot',
        avatar: false,
        buttonsVisible: false,
        highlightName: true,
        awards: true,
        tapAwards: true,
        flairs: true,
        flairsColor: true,
      },
      setCommentSort: (value) =>
        set(
          produce((state) => {
            state.comments.sort = value;
          })
        ),
      setCommentSettings: (type) =>
        set(
          produce((state) => {
            state.comments[type] = !state.comments[type];
          })
        ),

      card: {
        carousel: true,
        previewText: true,
      },
      setCardSettings: (type) =>
        set(
          produce((state) => {
            state.card[type] = !state.card[type];
          })
        ),
    }),
    {
      name: 'settingsStore',
      getStorage: () => AsyncStorage,
    }
  )
);
