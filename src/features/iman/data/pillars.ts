// Шесть основ имана. Тексты описаний добавятся позже.
export type ImanPillar = {
  id: string;
  number: number;
  title: string;
};

export const IMAN_PILLARS: ImanPillar[] = [
  { id: 'allah', number: 1, title: 'Вера в Аллаха' },
  { id: 'angels', number: 2, title: 'Вера в ангелов' },
  { id: 'books', number: 3, title: 'Вера в Писания' },
  { id: 'messengers', number: 4, title: 'Вера в посланников' },
  { id: 'judgment', number: 5, title: 'Вера в Судный день' },
  { id: 'qadr', number: 6, title: 'Вера в предопределение' },
];
