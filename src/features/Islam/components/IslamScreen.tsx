
import React from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Svg, { Circle, G, Path } from 'react-native-svg';
import { MosqueIllustration } from '@/shared/hooks/image-hook';

const COLORS = {
	background: '#032F22',
	backgroundDark: '#02271D',
	green: '#073E2C',
	greenLight: '#0B563D',
	cream: '#F6EEDB',
	creamLight: '#FFF9EB',
	gold: '#C9A24D',
	goldLight: '#E7CE94',
	text: '#15382B',
	muted: '#526459',
};

const ISLAM_PILLARS = [
	{
		number: 1,
		title: 'Шахада',
		subtitle: 'Свидетельство веры',
		slug: 'shahada',
	},
	{
		number: 2,
		title: 'Намаз',
		subtitle: 'Молитва',
		slug: 'namaz',
	},
	{
		number: 3,
		title: 'Закят',
		subtitle: 'Обязательная милостыня',
		slug: 'zakat',
	},
	{
		number: 4,
		title: 'Пост в Рамадан',
		subtitle: 'Пост',
		slug: 'fasting',
	},
	{
		number: 5,
		title: 'Хадж',
		subtitle: 'Паломничество',
		slug: 'hajj',
	},
];



// Золотой орнамент
function GoldOrnament({ width = 180 }: { width?: number }) {
	return (
		<Svg
			width={width}
			height={32}
			viewBox="0 0 240 32"
			fill="none"
		>
			<G
				stroke={COLORS.gold}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<Path d="M0 16 H91 M149 16 H240" strokeWidth={0.8} />

				<Path
					d="M120 2 L129 11 L139 16 L129 21 L120 30 L111 21 L101 16 L111 11Z"
					strokeWidth={1.3}
				/>

				<Path
					d="M120 9 L127 16 L120 23 L113 16Z"
					strokeWidth={0.9}
				/>

				<Circle cx={120} cy={16} r={2} fill={COLORS.gold} />

				<Path
					d="M91 16 Q103 6 112 16 Q103 26 91 16Z"
					strokeWidth={0.85}
				/>

				<Path
					d="M149 16 Q137 6 128 16 Q137 26 149 16Z"
					strokeWidth={0.85}
				/>
			</G>
		</Svg>
	);
}

type PillarRowProps = {
	number: number;
	title: string;
	subtitle: string;
	onPress: () => void;
};

function PillarRow({
	number,
	title,
	subtitle,
	onPress,
}: PillarRowProps) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.pillarRow,
				pressed && styles.pressed,
			]}
		>
			<View style={styles.pillarNumber}>
				<Text style={styles.pillarNumberText}>
					{number}
				</Text>
			</View>

			<View style={styles.pillarText}>
				<Text style={styles.pillarTitle}>
					{title}
				</Text>

				<Text style={styles.pillarSubtitle}>
					{subtitle}
				</Text>
			</View>

			<Ionicons
				name="chevron-forward"
				size={19}
				color="#9B854E"
			/>
		</Pressable>
	);
}

export default function IslamScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.root}>
			<StatusBar barStyle="light-content" />

			<LinearGradient
				colors={[
					COLORS.backgroundDark,
					COLORS.background,
					'#06412F',
				]}
				style={StyleSheet.absoluteFill}
			/>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					styles.scrollContent,
					{
						paddingTop: insets.top + 8,
						paddingBottom: insets.bottom + 35,
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
						<GoldOrnament width={125} />

						<Text style={styles.navigationTitle}>
							Ислам
						</Text>
					</View>

					<View style={styles.navigationSpacer} />
				</View>

				{/* Кремовая панель */}
				<View style={styles.panel}>
					<View style={styles.panelInner}>
						{/* Заголовок раздела */}
						<View style={styles.headerSection}>
							<MosqueIllustration imagePath={require('../../../../assets/images/mosque.png')} />

							<View style={styles.headerText}>
								<Text style={styles.headerTitle}>
									Ислам
								</Text>

								<Text style={styles.headerSubtitle}>
									Пять столпов ислама.
								</Text>
							</View>
						</View>

						<View style={styles.separator} />

						{/* Описание */}
						<Text style={styles.description}>
							Ислам основан на пяти столпах,
							которые являются основой религии
							и пути мусульманина.
						</Text>

						<View style={styles.separator} />

						{/* Пять столпов */}
						<Text style={styles.sectionTitle}>
							Пять столпов ислама
						</Text>

						<View style={styles.pillars}>
							{ISLAM_PILLARS.map((pillar) => (
								<PillarRow
									key={pillar.number}
									number={pillar.number}
									title={pillar.title}
									subtitle={pillar.subtitle}
									onPress={() =>
										router.push(
											`/islam/${pillar.slug}` as any
										)
									}
								/>
							))}
						</View>

						{/* Нижний орнамент */}
						<View style={styles.footerOrnament}>
							<GoldOrnament width={185} />
						</View>
					</View>

					<View style={styles.panelDiamond} />
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: COLORS.background,
	},

	scrollContent: {
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
		alignItems: 'flex-start',
		justifyContent: 'center',
	},

	navigationCenter: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	navigationTitle: {
		marginTop: -2,
		fontSize: 23,
		fontFamily: 'serif',
		fontWeight: '700',
		color: COLORS.cream,
	},

	navigationSpacer: {
		width: 42,
	},

	panel: {
		width: '100%',
		backgroundColor: COLORS.cream,
		borderWidth: 2,
		borderColor: COLORS.gold,
		borderRadius: 19,
		padding: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 7 },
		shadowOpacity: 0.2,
		shadowRadius: 14,
		elevation: 5,
	},

	panelInner: {
		borderWidth: 0.7,
		borderColor: COLORS.goldLight,
		borderRadius: 13,
		paddingHorizontal: 14,
		paddingTop: 16,
		paddingBottom: 18,
	},

	headerSection: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
		paddingHorizontal: 4,
		paddingBottom: 14,
	},

	illustrationCircle: {
		width: 94,
		height: 94,
		borderRadius: 47,
		overflow: 'hidden',
	},

	headerText: {
		flex: 1,
	},

	headerTitle: {
		fontSize: 27,
		fontFamily: 'serif',
		fontWeight: '700',
		color: COLORS.green,
		marginBottom: 6,
	},

	headerSubtitle: {
		fontSize: 13,
		lineHeight: 19,
		color: COLORS.text,
	},

	separator: {
		width: '100%',
		height: 1,
		backgroundColor: '#E4D7BA',
		marginVertical: 13,
	},

	description: {
		fontSize: 14,
		lineHeight: 22,
		color: COLORS.text,
		paddingHorizontal: 2,
	},

	sectionTitle: {
		fontSize: 19,
		fontFamily: 'serif',
		fontWeight: '700',
		color: COLORS.green,
		marginBottom: 13,
	},

	pillars: {
		gap: 9,
	},

	pillarRow: {
		minHeight: 58,
		backgroundColor: COLORS.creamLight,
		borderWidth: 1,
		borderColor: '#E1D2B2',
		borderRadius: 14,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 6,
		paddingRight: 12,
		gap: 13,
	},

	pillarNumber: {
		width: 35,
		height: 35,
		borderRadius: 18,
		backgroundColor: COLORS.green,
		borderWidth: 1,
		borderColor: COLORS.gold,
		alignItems: 'center',
		justifyContent: 'center',
	},

	pillarNumberText: {
		fontSize: 16,
		fontFamily: 'serif',
		fontWeight: '700',
		color: COLORS.cream,
	},

	pillarText: {
		flex: 1,
		gap: 3,
	},

	pillarTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: COLORS.text,
	},

	pillarSubtitle: {
		fontSize: 11,
		color: COLORS.muted,
	},

	footerOrnament: {
		marginTop: 22,
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

	pressed: {
		opacity: 0.75,
		transform: [{ scale: 0.985 }],
	},
	domeImage: {
		width: '100%',
		height: '100%',
	},
});
