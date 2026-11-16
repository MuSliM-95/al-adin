
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, G, Path } from 'react-native-svg';

import { COLORS } from '../../../shared/styles/style';
import { IMAN_PILLARS, ImanPillar } from '../data/pillars';
import ImanVideoPlayer, { getYouTubeId } from './ImanVideoPlayer';

type Props = {
  pillar: ImanPillar;
  paragraphs: string[];
  // Ссылка на YouTube. Пока не приходит с сервера, кнопка показывает заглушку.
  videoUrl?: string | null;
};


// Декоративный золотой орнамент
function GoldOrnament({ width = 180 }: { width?: number }) {
  return (
    <Svg
      width={width}
      height={34}
      viewBox="0 0 240 34"
      fill="none"
    >
      <G
        stroke={COLORS.gold}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          d="M0 17 H88 M152 17 H240"
          strokeWidth={0.8}
        />

        <Path
          d="
            M120 2
            L129 11
            L140 17
            L129 23
            L120 32
            L111 23
            L100 17
            L111 11Z
          "
          strokeWidth={1.2}
        />

        <Path
          d="M120 9 L128 17 L120 25 L112 17Z"
          strokeWidth={0.9}
        />

        <Path
          d="M88 17 Q102 4 113 17 Q102 30 88 17Z"
          strokeWidth={0.8}
        />

        <Path
          d="M152 17 Q138 4 127 17 Q138 30 152 17Z"
          strokeWidth={0.8}
        />

        <Circle
          cx={120}
          cy={17}
          r={2}
          fill={COLORS.gold}
        />
      </G>
    </Svg>
  );
}

// Декоративные элементы в углах панели
function PanelCorner({
  position,
}: {
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}) {
  const flipX = position.includes('Right');
  const flipY = position.includes('bottom');

  return (
    <View
      pointerEvents="none"
      style={[
        styles.corner,
        flipX ? styles.cornerRight : styles.cornerLeft,
        flipY ? styles.cornerBottom : styles.cornerTop,
        {
          transform: [
            { scaleX: flipX ? -1 : 1 },
            { scaleY: flipY ? -1 : 1 },
          ],
        },
      ]}
    >
      <Svg width={38} height={38} viewBox="0 0 40 40">
        <G
          stroke={COLORS.gold}
          strokeLinecap="round"
          fill="none"
        >
          <Path
            d="M1 35 V12 Q1 1 12 1 H35"
            strokeWidth={1.3}
          />

          <Path
            d="M7 30 V15 Q7 7 15 7 H30"
            strokeWidth={0.6}
          />

          <Path
            d="M3 36 Q18 31 20 19 Q22 9 35 4"
            strokeWidth={0.8}
          />

          <Path
            d="M11 24 Q21 26 24 15"
            strokeWidth={0.8}
          />

          <Circle
            cx={11}
            cy={11}
            r={2}
            fill={COLORS.gold}
          />
        </G>
      </Svg>
    </View>
  );
}

export default function ImanPillarPage({
  pillar,
  paragraphs,
  videoUrl = 'https://youtu.be/HsPK3KfHyKM?si=p4b8BSgHez8gRcNI',
}: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Открыт ли встроенный плеер под кнопкой видео
  const [playing, setPlaying] = useState(false);
  const canPlay = Boolean(videoUrl && getYouTubeId(videoUrl));

  const total = IMAN_PILLARS.length;
  const currentIndex = IMAN_PILLARS.findIndex(
    (item) => item.number === pillar.number
  );
  // Соседние основы для кнопок перехода; на краю списка будет null
  const prevPillar = currentIndex > 0 ? IMAN_PILLARS[currentIndex - 1] : null;
  const nextPillar =
    currentIndex < IMAN_PILLARS.length - 1 ? IMAN_PILLARS[currentIndex + 1] : null;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[
          COLORS.backgroundDark,
          COLORS.background
        ]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 40,
          },
        ]}
      >
        {/* Навигация */}
        <View style={styles.navigation}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={27}
              color={COLORS.cream}
            />
          </Pressable>

          <View style={styles.navigationCenter}>
            <GoldOrnament width={115} />

            <Text style={styles.navigationTitle}>
              Основы имана
            </Text>
          </View>

          <View style={styles.navigationSpacer} />
        </View>

        {/* Основная панель */}
        <View style={styles.panel}>
          <View style={styles.panelInner}>
            <PanelCorner position="topLeft" />
            <PanelCorner position="topRight" />
            <PanelCorner position="bottomLeft" />
            <PanelCorner position="bottomRight" />

            {/* Номер основы */}
            <View style={styles.badgeWrapper}>
              <View style={styles.badgeOuter}>
                <View style={styles.badgeInner}>
                  <Text style={styles.badgeNumber}>
                    {pillar.number}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.eyebrow}>
              ОСНОВА ИМАНА № {pillar.number}
            </Text>

            <Text style={styles.title}>
              {pillar.title}
            </Text>

            <View style={styles.titleOrnament}>
              <GoldOrnament width={205} />
            </View>

            {/* Содержание */}
            <View style={styles.article}>
              {paragraphs.map((paragraph, index) => (
                <View
                  key={index}
                  style={[
                    styles.paragraphBlock,
                    index > 0 && styles.paragraphSeparated,
                  ]}
                >
                  <Text style={styles.paragraph}>
                    {paragraph}
                  </Text>
                </View>
              ))}
            </View>

            {/* Прогресс */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeading}>
                <Text style={styles.progressLabel}>
                  Изучение основ имана
                </Text>

                <Text style={styles.progressCount}>
                  {pillar.number} / {total}
                </Text>
              </View>

              <View style={styles.progressDots}>
                {IMAN_PILLARS.map((item, index) => (
                  <View
                    key={item.number}
                    style={[
                      styles.progressDot,
                      index <= currentIndex
                        ? styles.progressDotActive
                        : styles.progressDotInactive,
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Видео-урок: плеер открывается прямо на странице; без ссылки кнопка-заглушка */}
            <Pressable
              disabled={!canPlay}
              onPress={() => setPlaying((value) => !value)}
              accessibilityRole="button"
              accessibilityLabel={canPlay ? 'Видео-урок' : 'Видео скоро появится'}
              style={({ pressed }) => [
                styles.videoButton,
                !canPlay && styles.videoButtonDisabled,
                pressed && styles.videoButtonPressed,
              ]}
            >
              <Ionicons
                name="play-circle-outline"
                size={22}
                color={canPlay ? COLORS.cream : COLORS.goldDark}
              />
              <Text
                style={[
                  styles.videoButtonText,
                  !canPlay && styles.videoButtonTextDisabled,
                ]}
              >
                {!canPlay
                  ? 'Видео скоро появится'
                  : playing
                    ? 'Скрыть видео'
                    : 'Видео-урок'}
              </Text>
            </Pressable>

            {playing && canPlay && videoUrl && (
              <ImanVideoPlayer videoUrl={videoUrl} />
            )}

            {/* Переход к соседней основе без возврата к списку */}
            <View style={styles.pagerRow}>
              <Pressable
                disabled={!prevPillar}
                onPress={() => prevPillar && router.replace(`/iman/${prevPillar.id}`)}
                accessibilityRole="button"
                accessibilityLabel="Предыдущая основа"
                style={({ pressed }) => [
                  styles.pagerButton,
                  !prevPillar && styles.pagerButtonDisabled,
                  pressed && styles.videoButtonPressed,
                ]}
              >
                <Text style={[styles.pagerText, !prevPillar && styles.pagerTextDisabled]}>
                  ← Предыдущая
                </Text>
              </Pressable>

              <Pressable
                disabled={!nextPillar}
                onPress={() => nextPillar && router.replace(`/iman/${nextPillar.id}`)}
                accessibilityRole="button"
                accessibilityLabel="Следующая основа"
                style={({ pressed }) => [
                  styles.pagerButton,
                  !nextPillar && styles.pagerButtonDisabled,
                  pressed && styles.videoButtonPressed,
                ]}
              >
                <Text style={[styles.pagerText, !nextPillar && styles.pagerTextDisabled]}>
                  Следующая →
                </Text>
              </Pressable>
            </View>

            <View style={styles.footerOrnament}>
              <GoldOrnament width={185} />
            </View>
          </View>

          <View style={styles.panelDiamond} />
        </View>

        <Text style={styles.footerText}>
          Ильм Ад-Дин
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },

  content: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },

  navigation: {
    width: '100%',
    height: 67,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  backButton: {
    width: 42,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  navigationCenter: {
    flex: 1,
    alignItems: 'center',
  },

  navigationTitle: {
    fontSize: 21,
    fontFamily: 'serif',
    fontWeight: '700',
    color: COLORS.cream,
    marginTop: -2,
  },

  navigationSpacer: {
    width: 42,
  },

  // Основная панель
  panel: {
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.gold,
    borderRadius: 20,
    padding: 5,
    backgroundColor: COLORS.cream,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 5,
  },

  panelInner: {
    position: 'relative',
    borderWidth: 0.8,
    borderColor: COLORS.goldLight,
    borderRadius: 14,
    paddingHorizontal: 21,
    paddingTop: 32,
    paddingBottom: 22,
  },

  corner: {
    position: 'absolute',
    width: 38,
    height: 38,
    zIndex: 1,
  },

  cornerTop: {
    top: 5,
  },

  cornerBottom: {
    bottom: 5,
  },

  cornerLeft: {
    left: 5,
  },

  cornerRight: {
    right: 5,
  },

  // Круг с номером
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 13,
  },

  badgeOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: COLORS.gold,
    padding: 5,
    backgroundColor: COLORS.creamDeep,
  },

  badgeInner: {
    flex: 1,
    borderRadius: 35,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeNumber: {
    fontSize: 33,
    fontFamily: 'serif',
    fontWeight: '700',
    color: COLORS.cream,
  },

  eyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.goldDark,
  },

  title: {
    marginTop: 10,
    fontSize: 27,
    lineHeight: 36,
    fontFamily: 'serif',
    fontWeight: '700',
    color: COLORS.background,
    textAlign: 'center',
  },

  titleOrnament: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  // Текст статьи
  article: {
    width: '100%',
  },

  paragraphBlock: {
    paddingVertical: 12,
  },

  paragraphSeparated: {
    borderTopWidth: 1,
    borderTopColor: COLORS.creamDeep,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 27,
    color: COLORS.darkText,
    textAlign: 'left',
  },

  // Индикатор изучения
  progressSection: {
    marginTop: 23,
    paddingTop: 19,
    borderTopWidth: 1,
    borderTopColor: COLORS.creamDeep,
  },

  progressHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  progressLabel: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },

  progressCount: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.background,
  },

  progressDots: {
    flexDirection: 'row',
    gap: 7,
  },

  progressDot: {
    flex: 1,
    height: 5,
    borderRadius: 3,
  },

  progressDotActive: {
    backgroundColor: COLORS.gold,
  },

  progressDotInactive: {
    backgroundColor: COLORS.creamDeep,
  },

  videoButton: {
    marginTop: 22,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },

  videoButtonDisabled: {
    backgroundColor: COLORS.creamDeep,
  },

  videoButtonPressed: {
    opacity: 0.8,
  },

  videoButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.cream,
  },

  videoButtonTextDisabled: {
    color: COLORS.goldDark,
  },

  pagerRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },

  pagerButton: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.gold,
    backgroundColor: COLORS.background,
  },

  pagerButtonDisabled: {
    backgroundColor: COLORS.creamDeep,
  },

  pagerText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.cream,
  },

  pagerTextDisabled: {
    color: COLORS.goldDark,
  },

  footerOrnament: {
    marginTop: 25,
    alignItems: 'center',
  },

  panelDiamond: {
    position: 'absolute',
    bottom: -7,
    left: '50%',
    marginLeft: -6,
    width: 12,
    height: 12,
    backgroundColor: COLORS.cream,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: COLORS.gold,
    transform: [{ rotate: '45deg' }],
  },

  footerText: {
    marginTop: 25,
    fontSize: 13,
    fontFamily: 'serif',
    color: COLORS.goldLight,
    opacity: 0.7,
  },
});
