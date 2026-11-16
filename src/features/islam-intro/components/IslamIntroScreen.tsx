
import React from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
	Circle,
	ClipPath,
	Defs,
	G,
	Image as SvgImage,
	Path,
} from 'react-native-svg';

// Используем фотографию мечети из главной страницы.
const mosqueImage = Image.resolveAssetSource(
	require('../../../../assets/images/prophet-mosque.jpg')
);

const COLORS = {
	green: '#063A2A',
	greenDark: '#032B20',
	cream: '#F6EEDB',
	creamLight: '#FFF8E9',
	gold: '#C9A24D',
	goldLight: '#E8CF8B',
	text: '#153B2D',
	muted: '#526358',
};

const SECTIONS = [
	{
		title: 'Иман',
		icon: 'mosque' as const,
		route: '/iman',
	},
	{
		title: 'Ислам',
		icon: 'mosque-outline' as const,
		route: '/islam',
	},
	{
		title: 'Ихсан',
		icon: 'heart' as const,
		route: '/ihsan',
	},
];

// Золотой орнамент для заголовка и нижней части панели.
function GoldOrnament({
	width = 160,
}: {
	width?: number;
}) {
	return (
		<Svg width={width} height={28} viewBox="0 0 220 28">
			<G
				fill="none"
				stroke={COLORS.gold}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<Path d="M0 14 H82 M138 14 H220" strokeWidth={0.8} />

				<Path
					d="M110 1 L119 10 L128 14 L119 18 L110 27 L101 18 L92 14 L101 10Z"
					strokeWidth={1.2}
				/>

				<Path
					d="M110 7 L117 14 L110 21 L103 14Z"
					strokeWidth={0.8}
				/>

				<Path
					d="M82 14 Q94 4 103 14 Q94 24 82 14Z"
					strokeWidth={0.8}
				/>

				<Path
					d="M138 14 Q126 4 117 14 Q126 24 138 14Z"
					strokeWidth={0.8}
				/>

				<Circle cx={110} cy={14} r={2} fill={COLORS.gold} />
			</G>
		</Svg>
	);
}

// Фотография внутри фигурной арки.
function MosqueArch({
	width,
	height = 240,
}: {
	width: number;
	height?: number;
}) {
	const path = `
    M 2 ${height}
    L 2 ${height * 0.35}
    Q 2 ${height * 0.21} ${width * 0.18} ${height * 0.2}
    Q ${width * 0.22} ${height * 0.08}
      ${width * 0.38} ${height * 0.08}
    Q ${width * 0.45} ${height * 0.06}
      ${width * 0.5} 2
    Q ${width * 0.55} ${height * 0.06}
      ${width * 0.62} ${height * 0.08}
    Q ${width * 0.78} ${height * 0.08}
      ${width * 0.82} ${height * 0.2}
    Q ${width - 2} ${height * 0.21}
      ${width - 2} ${height * 0.35}
    L ${width - 2} ${height}
    Z
  `;

	return (
		<Svg width={width} height={height}>
			<Defs>
				<ClipPath id="islamIntroArch">
					<Path d={path} />
				</ClipPath>
			</Defs>

			<SvgImage
				href={{ uri: mosqueImage?.uri }}
				x={0}
				y={0}
				width={width}
				height={height}
				preserveAspectRatio="xMidYMid slice"
				clipPath="url(#islamIntroArch)"
			/>

			<Path
				d={path}
				fill="none"
				stroke={COLORS.gold}
				strokeWidth={2.5}
			/>
		</Svg>
	);
}

// Декоративная кремовая панель.
function PanelFrame({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<View style={styles.panel}>
			<View style={styles.panelInner}>
				{children}
			</View>

			{/* Маленький золотой ромб снизу */}
			<View style={styles.panelBottom}>
				<View style={styles.panelDiamond} />
			</View>
		</View>
	);
}

export default function IslamIntroScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();

	const contentWidth = Math.min(width - 32, 440);

	return (
		<View style={styles.root}>
			<StatusBar barStyle="light-content" />

			<LinearGradient
				colors={[COLORS.greenDark, COLORS.green, '#052F23']}
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
						style={styles.backButton}
						hitSlop={12}
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
							Что такое ислам?
						</Text>
					</View>

					<View style={styles.navigationSpacer} />
				</View>

				{/* Мечеть */}
				<View style={styles.hero}>
					<MosqueArch
						width={contentWidth}
						height={240}
					/>

					<LinearGradient
						colors={[
							'transparent',
							'rgba(3,43,32,0.08)',
							COLORS.green,
						]}
						locations={[0, 0.55, 1]}
						style={styles.heroOverlay}
						pointerEvents="none"
					/>
				</View>

				{/* Основная кремовая панель */}
				<View style={styles.panelPosition}>
					<PanelFrame>
						<Text style={styles.pageTitle}>
							Что такое ислам?
						</Text>

						<Text style={styles.description}>
							Ислам — это религия, которая призывает
							к поклонению Единому Аллаху, следованию
							Его посланнику Мухаммаду ﷺ и стремлению
							к благому в этом мире и в Вечной жизни.
							Ислам охватывает веру, поклонение,
							нравственность и образ жизни.
						</Text>

						<View style={styles.divider}>
							<GoldOrnament width={230} />
						</View>

						<Text style={styles.sectionHeading}>
							Основные разделы ислама:
						</Text>

						<View style={styles.sectionList}>
							{SECTIONS.map((section) => (
								<Pressable
									key={section.title}
									onPress={() =>
										router.push(section.route as any)
									}
									style={({ pressed }) => [
										styles.sectionCard,
										pressed && styles.pressed,
									]}
								>
									<View style={styles.sectionIcon}>
										<MaterialCommunityIcons
											name={section.icon}
											size={29}
											color={COLORS.green}
										/>
									</View>

									<Text style={styles.sectionTitle}>
										{section.title}
									</Text>

									<Ionicons
										name="chevron-forward"
										size={19}
										color="#A9843E"
									/>
								</Pressable>
							))}
						</View>

						<View style={styles.footerOrnament}>
							<GoldOrnament width={180} />
						</View>
					</PanelFrame>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: COLORS.greenDark,
	},

	scrollContent: {
		paddingHorizontal: 16,
		alignItems: 'center',
	},

	navigation: {
		width: '100%',
		height: 62,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	backButton: {
		width: 40,
		height: 44,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},

	navigationCenter: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	navigationTitle: {
		marginTop: -2,
		fontSize: 19,
		fontFamily: 'serif',
		fontWeight: '700',
		color: COLORS.cream,
	},

	navigationSpacer: {
		width: 40,
	},

	hero: {
		width: '100%',
		alignItems: 'center',
		position: 'relative',
		marginTop: 8,
	},

	heroOverlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 85,
	},

	panelPosition: {
		width: '100%',
		marginTop: -42,
		zIndex: 2,
	},

	panel: {
		width: '100%',
		borderRadius: 21,
		borderWidth: 2,
		borderColor: COLORS.gold,
		backgroundColor: COLORS.cream,
		padding: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.18,
		shadowRadius: 14,
		elevation: 5,
	},

	panelInner: {
		borderWidth: 0.7,
		borderColor: COLORS.goldLight,
		borderRadius: 15,
		paddingHorizontal: 17,
		paddingTop: 20,
		paddingBottom: 18,
	},

	panelBottom: {
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

	panelDiamond: {
		width: 4,
		height: 4,
		backgroundColor: COLORS.gold,
		alignSelf: 'center',
		marginTop: 3,
	},

	pageTitle: {
		fontSize: 25,
		lineHeight: 34,
		fontFamily: 'serif',
		fontWeight: '700',
		textAlign: 'center',
		color: COLORS.green,
		marginBottom: 12,
	},

	description: {
		fontSize: 15,
		lineHeight: 23,
		color: COLORS.text,
		textAlign: 'left',
	},

	divider: {
		marginTop: 14,
		marginBottom: 9,
		alignItems: 'center',
	},

	sectionHeading: {
		fontSize: 15,
		fontFamily: 'serif',
		fontWeight: '700',
		color: COLORS.text,
		textAlign: 'center',
		marginBottom: 13,
	},

	sectionList: {
		gap: 11,
	},

	sectionCard: {
		minHeight: 61,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 14,
		paddingHorizontal: 12,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#E2CFA4',
		backgroundColor: COLORS.creamLight,
	},

	sectionIcon: {
		width: 37,
		alignItems: 'center',
		justifyContent: 'center',
	},

	sectionTitle: {
		flex: 1,
		fontSize: 19,
		fontFamily: 'serif',
		fontWeight: '700',
		color: COLORS.green,
	},

	footerOrnament: {
		marginTop: 22,
		alignItems: 'center',
	},

	pressed: {
		opacity: 0.75,
		transform: [{ scale: 0.985 }],
	},
});
