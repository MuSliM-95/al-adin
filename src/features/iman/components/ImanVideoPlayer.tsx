import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { COLORS } from '../../../shared/styles/style';

// Достаём 11-символьный ID видео из ссылок youtube.com и youtu.be.
// Любой другой адрес возвращает null: плеер не откроет произвольный сайт.
export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

const EMBED_PREFIX = 'https://www.youtube.com/embed/';

type Props = {
  videoUrl: string;
};

// Встроенный плеер YouTube, 16:9. Если видео не встраивается, показываем запасную кнопку.
export default function ImanVideoPlayer({ videoUrl }: Props) {
  const [failed, setFailed] = useState(false);
  const videoId = getYouTubeId(videoUrl);

  if (!videoId) {
    return null;
  }

  if (failed) {
    return (
      <Pressable
        onPress={() => Linking.openURL(videoUrl).catch(() => {})}
        accessibilityRole="button"
        style={styles.fallback}
      >
        <Text style={styles.fallbackText}>
          Видео не открывается здесь. Открыть в YouTube
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.frame}>
      <WebView
        source={{ uri: `${EMBED_PREFIX}${videoId}` }}
        allowsFullscreenVideo
        javaScriptEnabled
        onError={() => setFailed(true)}
        onHttpError={() => setFailed(true)}
        // Внутри плеера YouTube своя ссылка «Смотреть на YouTube»: она ведёт
        // на полную страницу. Разрешаем только само встроенное видео.
        onShouldStartLoadWithRequest={(request) =>
          request.url.startsWith(EMBED_PREFIX) || request.url === 'about:blank'
        }
        setSupportMultipleWindows={false}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginTop: 14,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gold,
    backgroundColor: '#000',
  },

  webview: {
    flex: 1,
    backgroundColor: '#000',
  },

  fallback: {
    marginTop: 14,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.gold,
    backgroundColor: COLORS.creamDeep,
    paddingHorizontal: 12,
  },

  fallbackText: {
    fontSize: 14,
    color: COLORS.darkText,
    textAlign: 'center',
  },
});
