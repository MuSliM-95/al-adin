
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../../../shared/styles/style';
import CornerRow from './CornerRow';
import GoldenDivider from './GoldenDivider';
import MosqueHero from './MosqueHero';




const SECTIONS = [
  {
    title: 'Иман',
    subtitle: 'Основы веры',
    icon: 'mosque' as const,
    route: '/iman',
  },
  {
    title: 'Ислам',
    subtitle: 'Поклонение и обязанности',
    icon: 'cube' as const,
    route: '/islam',
  },
  {
    title: 'Ихсан',
    subtitle: 'Искренность и духовность',
    icon: 'heart' as const,
    route: '/ihsan',
  },
];

// --------------------------------------------------
// HOME MAIN
// --------------------------------------------------

export default function HomeMain() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const contentWidth = Math.min(width - 36, 440);
  const heroHeight = 300;

  const navigate = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Тёмно-зелёный градиент */}
      <LinearGradient
        colors={[
          COLORS.backgroundDark,
          COLORS.background,
          COLORS.backgroundLight,
          COLORS.background,
        ]}
        locations={[0, 0.25, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 36,
          },
        ]}
      >
        {/* Верхние золотые узоры по углам */}
        <CornerRow />

        {/* Фотография мечети в исламской арке */}
        <View style={styles.hero}>
          <MosqueHero
            width={contentWidth}
            height={heroHeight}
          />

          <LinearGradient
            colors={[
              'transparent',
              'rgba(11,61,58,0.25)',
              COLORS.background,
            ]}
            locations={[0, 0.4, 1]}
            style={styles.heroOverlay}
            pointerEvents="none"
          />
        </View>

        {/* Название */}
        <Text style={styles.appTitle}>
          Ильм Ад-Дин
        </Text>

        {/* Центральный золотой орнамент */}
        <View style={styles.dividerWrapper}>
          <GoldenDivider
            width={Math.min(contentWidth - 32, 200)}
          />
        </View>

        {/* Шахада */}
        <View style={styles.shahadaContainer}>
          <Text style={styles.shahada}>
            لَا إِلَٰهَ إِلَّا اللَّهُ
            {'\n'}
            مُحَمَّدٌ رَسُولُ اللَّهِ
          </Text>
        </View>

        {/* Что такое ислам */}
        <Pressable
          onPress={() => navigate('/islam-intro')}
          style={({ pressed }) => [
            styles.introCard,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.introIcon}>
            <Ionicons
              name="book-outline"
              size={32}
              color={COLORS.darkText}
            />
          </View>

          <View style={styles.introContent}>
            <Text style={styles.introTitle}>
              Что такое ислам?
            </Text>

            <Text style={styles.introSubtitle}>
              Знакомство с основами ислама
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={COLORS.goldDark}
          />
        </Pressable>

        {/* Иман / Ислам / Ихсан */}
        <View style={styles.sections}>
          {SECTIONS.map((section) => (
            <Pressable
              key={section.title}
              onPress={() => navigate(section.route)}
              style={({ pressed }) => [
                styles.sectionCard,
                pressed && styles.pressed,
              ]}
            >
              <MaterialCommunityIcons
                name={section.icon}
                size={37}
                color={COLORS.darkText}
              />

              <Text style={styles.sectionTitle}>
                {section.title}
              </Text>

              <Text style={styles.sectionSubtitle}>
                {section.subtitle}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Задать вопрос — действие пока не подключено */}
        <View style={styles.questionCard}>
          <View style={styles.questionIcon}>
            <Ionicons
              name="chatbubble-ellipses"
              size={24}
              color={COLORS.cream}
            />
          </View>

          <View style={styles.questionContent}>
            <Text style={styles.questionTitle}>
              Задать вопрос
            </Text>

            <Text style={styles.questionSubtitle}>
              Получить ответ от специалиста
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={23}
            color={COLORS.cream}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 18,
    alignItems: 'center',
  },


  // Арка
  hero: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },

  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },

  // Название приложения
  appTitle: {
    marginTop: -48,
    fontSize: 37,
    lineHeight: 49,
    fontFamily: 'serif',
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.cream,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 12,
  },

  dividerWrapper: {
    marginTop: 8,
    alignItems: 'center',
  },

  // Шахада
  shahadaContainer: {
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 18,
    marginBottom: 25,
  },

  shahada: {
    fontSize: 40,
    lineHeight: 64,
    color: COLORS.cream,
    textAlign: 'center',
    writingDirection: 'rtl',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },

  // Карточка "Что такое ислам?"
  introCard: {
    width: '100%',
    minHeight: 84,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 20,
    borderWidth: 1.8,
    borderColor: COLORS.gold,
    backgroundColor: COLORS.cream,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
  },

  introIcon: {
    width: 43,
    alignItems: 'center',
  },

  introContent: {
    flex: 1,
    gap: 5,
  },

  introTitle: {
    fontSize: 19,
    fontWeight: '700',
    fontFamily: 'serif',
    color: COLORS.darkText,
  },

  introSubtitle: {
    fontSize: 11,
    color: COLORS.secondaryText,
  },

  // Три карточки
  sections: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },

  sectionCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 143,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 13,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 19,
    fontFamily: 'serif',
    fontWeight: '700',
    color: COLORS.darkText,
  },

  sectionSubtitle: {
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
    color: COLORS.secondaryText,
  },

  // Карточка вопросов
  questionCard: {
    width: '100%',
    minHeight: 76,
    marginTop: 21,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    backgroundColor: COLORS.questionBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    gap: 13,
  },

  questionIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  questionContent: {
    flex: 1,
    gap: 4,
  },

  questionTitle: {
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: '700',
    color: COLORS.cream,
  },

  questionSubtitle: {
    fontSize: 11,
    color: COLORS.cream,
  },


  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
