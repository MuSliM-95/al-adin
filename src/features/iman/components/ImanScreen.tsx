
import {
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MosqueIllustration } from '@/shared/hooks/image-hook';
import { COLORS } from '@/shared/styles/style';
import Svg, {
	Circle,
	G,
	Path,
} from 'react-native-svg';


// --------------------------------------------------
// DATA
// --------------------------------------------------

const IMAN_PILLARS = [
	{
		number: 1,
		title: 'Вера в Аллаха',
		slug: 'allah',
	},
	{
		number: 2,
		title: 'Вера в ангелов',
		slug: 'angels',
	},
	{
		number: 3,
		title: 'Вера в Писания',
		slug: 'books',
	},
	{
		number: 4,
		title: 'Вера в посланников',
		slug: 'messengers',
	},
	{
		number: 5,
		title: 'Вера в предопределение',
		slug: 'destiny',
	},
	{
		number: 6,
		title: 'Вера в Судный день',
		slug: 'last-day',
	},
];

// --------------------------------------------------
// ORNAMENT
// --------------------------------------------------

function GoldOrnament({
	width = 180,
}: {
	width?: number;
}) {
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
					d="
            M120 2
            L129 11
            L139 16
            L129 21
            L120 30
            L111 21
            L101 16
            L111 11Z
          "
					strokeWidth={1.3}
				/>

				<Path
					d="M120 9 L127 16 L120 23 L113 16Z"
					strokeWidth={0.9}
				/>

				<Circle
					cx={120}
					cy={16}
					r={2}
					fill={COLORS.gold}
				/>

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
	onPress: () => void;
};

function PillarRow({
	number,
	title,
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

			<Text style={styles.pillarTitle}>
				{title}
			</Text>

			<Ionicons
				name="chevron-forward"
				size={18}
				color={COLORS.goldDark}
			/>
		</Pressable>
	);
}

// --------------------------------------------------
// MAIN SCREEN
// --------------------------------------------------

export default function ImanScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.root}>
			<StatusBar barStyle="light-content" />

			<LinearGradient
				colors={[
					COLORS.backgroundDark,
					COLORS.background,
					COLORS.background,
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
				{/* Верхняя навигация */}
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
							Иман
						</Text>
					</View>

					<View style={styles.navigationSpacer} />
				</View>

				{/* Основная панель */}
				<View style={styles.panel}>
					<View style={styles.panelInner}>

						{/* Верхний блок */}
						<View style={styles.headerSection}>
							<MosqueIllustration imagePath={require('../../../../assets/images/dome.png')} />


							<View style={styles.headerText}>
								<Text style={styles.headerTitle}>
									Иман
								</Text>

								<Text style={styles.headerSubtitle}>
									Вера в сердце, в словах
									{'\n'}
									и в делах.
								</Text>
							</View>
						</View>

						<View style={styles.separator} />

						{/* Описание */}
						<Text style={styles.description}>
							Иман — это вера в Аллаха, Его ангелов,
							Писания, посланников, Судный день
							и предопределение. Это основа всей
							жизни мусульманина.
						</Text>

						<View style={styles.separator} />

						{/* Шесть основ */}
						<Text style={styles.sectionTitle}>
							Основные аспекты имана
						</Text>

						<View style={styles.pillars}>
							{IMAN_PILLARS.map((pillar) => (
								<PillarRow
									key={pillar.number}
									number={pillar.number}
									title={pillar.title}
									onPress={() =>
										router.push(
											`/iman/${pillar.slug}` as any
										)
									}
								/>
							))}
						</View>

						{/* Видеоуроки */}
						<Pressable
							onPress={() =>
								router.push('/iman/videos' as any)
							}
							style={({ pressed }) => [
								styles.videoButton,
								pressed && styles.pressed,
							]}
						>
							<View style={styles.playCircle}>
								<Ionicons
									name="play"
									size={19}
									color={COLORS.background}
								/>
							</View>

							<View style={styles.videoText}>
								<Text style={styles.videoTitle}>
									Видео-уроки
								</Text>

								<Text style={styles.videoSubtitle}>
									Краткие объяснения по каждой теме
								</Text>
							</View>

							<Ionicons
								name="chevron-forward"
								size={18}
								color={COLORS.cream}
							/>
						</Pressable>

						{/* Нижний орнамент */}
						<View style={styles.footerOrnament}>
							<GoldOrnament width={185} />
						</View>
					</View>

					{/* Нижний декоративный ромб */}
					<View style={styles.panelDiamond} />
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

	// Кремовая панель
	panel: {
		width: '100%',
		backgroundColor: COLORS.cream,
		borderWidth: 2,
		borderColor: COLORS.gold,
		borderRadius: 19,
		padding: 5,
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
		borderWidth: 0.7,
		borderColor: COLORS.goldLight,
		borderRadius: 13,
		paddingHorizontal: 14,
		paddingTop: 16,
		paddingBottom: 18,
	},

	// Иллюстрация и название
	headerSection: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
		paddingHorizontal: 4,
		paddingBottom: 14,
	},

	headerText: {
		flex: 1,
	},

	headerTitle: {
		fontSize: 27,
		fontFamily: 'serif',
		fontWeight: '700',
		color: COLORS.background,
		marginBottom: 6,
	},

	headerSubtitle: {
		fontSize: 13,
		lineHeight: 19,
		color: COLORS.darkText,
	},

	separator: {
		width: '100%',
		height: 1,
		backgroundColor: COLORS.creamDeep,
		marginVertical: 13,
	},

	description: {
		fontSize: 14,
		lineHeight: 22,
		color: COLORS.darkText,
		paddingHorizontal: 2,
	},

	sectionTitle: {
		fontSize: 19,
		fontFamily: 'serif',
		fontWeight: '700',
		color: COLORS.background,
		marginBottom: 13,
	},

	pillars: {
		gap: 9,
	},

	pillarRow: {
		minHeight: 48,
		backgroundColor: COLORS.creamLight,
		borderWidth: 1,
		borderColor: COLORS.creamDeep,
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
		backgroundColor: COLORS.background,
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

	pillarTitle: {
		flex: 1,
		fontSize: 13,
		lineHeight: 18,
		color: COLORS.darkText,
	},

	// Видеоуроки
	videoButton: {
		marginTop: 20,
		minHeight: 66,
		borderRadius: 13,
		backgroundColor: COLORS.background,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 13,
		gap: 12,
	},

	playCircle: {
		width: 35,
		height: 35,
		borderRadius: 18,
		backgroundColor: COLORS.cream,
		alignItems: 'center',
		justifyContent: 'center',
	},

	videoText: {
		flex: 1,
		gap: 4,
	},

	videoTitle: {
		fontSize: 15,
		fontWeight: '700',
		fontFamily: 'serif',
		color: COLORS.cream,
	},

	videoSubtitle: {
		fontSize: 10,
		lineHeight: 15,
		color: COLORS.cream,
	},

	footerOrnament: {
		marginTop: 17,
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

	illustrationCircle: {
		width: 94,
		height: 94,
		borderRadius: 47,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},

	domeImage: {
		width: '100%',
		height: '100%',
	},
});
