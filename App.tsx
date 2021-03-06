/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/hooks';
import { queryClient } from '@/lib/react-query';
import { RootNavigator } from '@/navigators';
import { useSettingsStore } from '@/stores';
import { Toasts } from '@/features/toast';
import { ErrorFallback } from '@/components';

export default function App() {
  const theme = useTheme();
  const [isHydrated, setIsHydrated] = useState<boolean>(
    // @ts-ignore
    useSettingsStore.persist.hasHydrated()
  );

  if (!isHydrated) {
    // @ts-ignore
    useSettingsStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    return null;
  }
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={async () => {
        await AsyncStorage.clear();
      }}
    >
      <QueryClientProvider client={queryClient}>
        <StatusBar style={theme.statusBar} translucent />
        <RootNavigator />
        <Toasts />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
