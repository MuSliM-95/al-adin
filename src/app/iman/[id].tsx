import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import ImanPillarPage from '@/features/iman/components/ImanPillarPage';
import { IMAN_PILLAR_CONTENT } from '@/features/iman/data/pillarContent';
import { IMAN_PILLARS } from '@/features/iman/data/pillars';
import { COLORS } from '@/shared/styles/style';

// Адрес вида /iman/allah. Маршрут только читает id и подключает компонент.
export default function ImanPillarScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();

  // id может прийти массивом, если в адресе несколько сегментов с этим именем.
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const pillar = IMAN_PILLARS.find((item) => item.id === id);

  // Неизвестный id, например /iman/unknown: показываем сообщение, а не падаем.
  if (!pillar) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: 'Не найдено' }} />
        <Text style={styles.notFound}>Такой основы нет</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: pillar.title }} />
      <ImanPillarPage
        pillar={pillar}
        paragraphs={IMAN_PILLAR_CONTENT[pillar.id] ?? []}
      />
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },

  notFound: {
    fontSize: 18,
    color: COLORS.cream,
  },
});
