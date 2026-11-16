import { Image, StyleSheet, View } from "react-native";

interface IProps {
	imagePath: string
}

export function MosqueIllustration({ imagePath }: IProps) {
	return (
		<View style={styles.illustrationCircle}>
			<Image
				source={imagePath}
				style={styles.domeImage}
				resizeMode="contain"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	illustrationCircle: {
		width: 94,
		height: 94,
		borderRadius: 47,
		overflow: 'hidden',
	},
	domeImage: {
		width: '100%',
		height: '100%',
	},
});
