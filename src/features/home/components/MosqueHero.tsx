
import { useId } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Svg, {
	ClipPath,
	Defs,
	Image as SvgImage,
	Path,
} from 'react-native-svg';

import { COLORS } from '../../../shared/styles/style';

type MosqueHeroProps = {
	width: number;
	height?: number;
};

const mosqueImage = Image.resolveAssetSource(
	require('../../../../assets/images/prophet-mosque.jpg')
);

export default function MosqueHero({
	width,
	height = 310,
}: MosqueHeroProps) {
	const clipId = useId().replace(/:/g, '');

	// Контур арки рассчитывается относительно размеров компонента.
	const path = `
    M 2 ${height}
    L 2 ${height * 0.38}

    Q 2 ${height * 0.24}
      ${width * 0.18} ${height * 0.24}

    Q ${width * 0.19} ${height * 0.14}
      ${width * 0.36} ${height * 0.14}

    Q ${width * 0.45} ${height * 0.1}
      ${width * 0.5} 3

    Q ${width * 0.55} ${height * 0.1}
      ${width * 0.64} ${height * 0.14}

    Q ${width * 0.81} ${height * 0.14}
      ${width * 0.82} ${height * 0.24}

    Q ${width - 2} ${height * 0.24}
      ${width - 2} ${height * 0.38}

    L ${width - 2} ${height}
    Z
  `;

	return (
		<View style={[styles.container, { width, height }]}>
			<Svg width={width} height={height}>
				<Defs>
					<ClipPath id={clipId}>
						<Path d={path} />
					</ClipPath>
				</Defs>

				<SvgImage
					href={{ uri: mosqueImage?.uri ?? '' }}
					x={0}
					y={0}
					width={width}
					height={height}
					preserveAspectRatio="xMidYMid slice"
					clipPath={`url(#${clipId})`}
				/>

				{/* Золотой контур арки */}
				<Path
					d={path}
					fill="none"
					stroke={COLORS.gold}
					strokeWidth={3}
				/>
			</Svg>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
	},
});
