
import React from 'react';
import {
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

import Svg, {
	Circle,
	G,
	Path,
	Line,
} from 'react-native-svg';
import { MosqueIllustration } from '@/shared/hooks/image-hook';

// ---------------------------------------------
// COLORS
// ---------------------------------------------

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

// ---------------------------------------------
// DATA
// ---------------------------------------------

const TOPICS = [
	{
		id: 'meaning',
		title: 'Понятие ихсана',
		icon: 'heart' as const,
		route: '/ihsan/meaning',
	},
	{
		id: 'practice',
		title: 'Практика ихсана\nв повседневной жизни',
		icon: 'sprout' as const,
		route: '/ihsan/practice',
	},
	{
		id: 'sincerity',
		title: 'Сердце и искренность',
		icon: 'check-decagram' as const,
		route: '/ihsan/sincerity',
	},
	{
		id: 'tasawwuf',
		title: 'Тасаввуф (Суфизм)',
		subtitle: 'В разработке',
		icon: 'mosque' as const,
		disabled: true,
	},
];

// ---------------------------------------------
// GOLD ORNAMENT
// ---------------------------------------------

function GoldOrnament({
	width = 180,
}: {
	width?: number;
}) {
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
				<Line
					x1={0}
					y1={17}
					x2={91}
					y2={17}
					strokeWidth={0.8}
				/>

				<Line
					x1={149}
					y1={17}
					x2={240}
					y2={17}
					strokeWidth={0.8}
				/>

				<Path
					d="
            M120 2
            Q126 11 138 17
            Q126 23 120 32
            Q114 23 102 17
            Q114 11 120 2Z
          "
					strokeWidth={1.3}
				/>

				<Path
					d="
            M120 9
            L128 17
            L120 25
            L112 17Z
          "
					strokeWidth={0.85}
				/>

				<Path
					d="
            M91 17
            Q104 5 113 17
            Q104 29 91 17Z
          "
					strokeWidth={0.85}
				/>

				<Path
					d="
            M149 17
            Q136 5 127 17
            Q136 29 149 17Z
          "
					strokeWidth={0.85}
				/>

				<Circle
					cx={120}
					cy={17}
					r={2.2}
					fill={COLORS.gold}
				/>
			</G>
		</Svg>
	);
}

// ---------------------------------------------
// TOPIC ROW
// ---------------------------------------------

type Topic = (typeof TOPICS)[number];

function TopicRow({
	topic,
	onPress,
}: {
	topic: Topic;
	onPress: () => void;
}) {
	const disabled = topic.disabled === true;

	return (
		<Pressable
			disabled={disabled}
			onPress={onPress}
			style={({ pressed }) => [
				styles.topicRow,
				disabled && styles.topicDisabled,
				pressed && !disabled && styles.pressed,
			]}
		>
			<View style={styles.topicIcon}>
				<MaterialCommunityIcons
					name={topic.icon}
					size={30}
					color={disabled ? '#99988B' : COLORS.green}
				/>
			</View>

			<View style={styles.topicContent}>
				<Text
					style={[
						styles.topicTitle,
						disabled && styles.topicTitleDisabled,
					]}
				>
					{topic.title}
				</Text>

				{topic.subtitle && (
					<Text style={styles.topicSubtitle}>
						{topic.subtitle}
					</Text>
				)}
			</View>

			<Ionicons
				name="chevron-forward"
				size={20}
				color={disabled ? '#B2A88E' : '#B58B37'}
			/>
		</Pressable>
	);
}

// ---------------------------------------------
// MAIN SCREEN
// ---------------------------------------------

export default function IhsanScreen() {
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
							Ихсан
						</Text>
					</View>

					<View style={styles.navigationSpacer} />
				</View>

				{/* Кремовая панель */}
				<View style={styles.panel}>
					<View style={styles.panelInner}>

						{/* Иллюстрация и заголовок */}
						<View style={styles.headerSection}>
							<MosqueIllustration imagePath={require('../../../../assets/images/heart.png')} />

							<View style={styles.headerText}>
								<Text style={styles.headerTitle}>
									Ихсан
								</Text>

								<Text style={styles.headerSubtitle}>
									Искреннее поклонение
									{'\n'}
									Аллаху.
								</Text>
							</View>
						</View>

						<View style={styles.separator} />

						{/* Описание */}
						<Text style={styles.description}>
							Ихсан — это поклоняться Аллаху так,
							как будто ты видишь Его. Это наивысшая
							степень веры, когда все дела совершаются
							искренне и с любовью к Нему.
						</Text>

						<View style={styles.separator} />

						{/* Темы */}
						<Text style={styles.sectionTitle}>
							Темы
						</Text>

						<View style={styles.topics}>
							{TOPICS.map((topic) => (
								<TopicRow
									key={topic.id}
									topic={topic}
									onPress={() => {
										if (topic.route) {
											router.push(topic.route as any);
										}
									}}
								/>
							))}
						</View>

						{/* Видеоуроки */}
						<Pressable
							onPress={() =>
								router.push('/ihsan/videos' as any)
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
									color={COLORS.green}
								/>
							</View>

							<View style={styles.videoText}>
								<Text style={styles.videoTitle}>
									Видео-уроки
								</Text>

								<Text style={styles.videoSubtitle}>
									Краткие и подробные уроки по теме
								</Text>
							</View>

							<Ionicons
								name="chevron-forward"
								size={18}
								color={COLORS.cream}
							/>
						</Pressable>

						{/* Нижний золотой орнамент */}
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

// ---------------------------------------------
// STYLES
// ---------------------------------------------

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

	topics: {
		gap: 10,
	},

	topicRow: {
		minHeight: 65,
		backgroundColor: COLORS.creamLight,
		borderWidth: 1,
		borderColor: '#E1D2B2',
		borderRadius: 15,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		gap: 13,
	},

	topicDisabled: {
		backgroundColor: '#F0E6D2',
		opacity: 0.7,
	},

	topicIcon: {
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},

	topicContent: {
		flex: 1,
		gap: 4,
	},

	topicTitle: {
		fontSize: 14,
		lineHeight: 20,
		color: COLORS.text,
	},

	topicTitleDisabled: {
		color: '#77796E',
	},

	topicSubtitle: {
		fontSize: 12,
		color: '#858679',
	},

	videoButton: {
		marginTop: 21,
		minHeight: 67,
		borderRadius: 14,
		backgroundColor: COLORS.green,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 13,
		gap: 12,
	},

	playCircle: {
		width: 36,
		height: 36,
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
		fontSize: 17,
		fontWeight: '700',
		fontFamily: 'serif',
		color: COLORS.cream,
	},

	videoSubtitle: {
		fontSize: 11,
		lineHeight: 16,
		color: '#E2E6D9',
	},

	footerOrnament: {
		marginTop: 20,
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
});
