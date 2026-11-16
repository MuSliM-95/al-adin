import Svg, { Circle, G, Path } from "react-native-svg";
import { COLORS } from "../../../shared/styles/style";

type DividerProps = {
	width?: number;
};

export default function GoldenDivider({
	width = 290,
}: DividerProps) {
	return (
		<Svg
			width={width}
			height={58}
			viewBox="0 0 320 58"
			fill="none"
		>
			<G
				stroke={COLORS.gold}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{/* Двойные линии по краям */}
				<Path d="M0 28 H68" strokeWidth={0.9} />
				<Path d="M252 28 H320" strokeWidth={0.9} />

				<Path
					d="M8 24 H59"
					strokeWidth={0.5}
					opacity={0.55}
				/>
				<Path
					d="M261 24 H312"
					strokeWidth={0.5}
					opacity={0.55}
				/>

				{/* Левая половина орнамента */}
				<G>
					<Path
						d="
              M68 28
              C85 28 87 8 106 10
              C121 12 121 29 109 32
              C99 34 95 23 102 19
            "
						strokeWidth={1.5}
					/>

					<Path
						d="
              M68 28
              C85 28 87 48 106 46
              C121 44 121 27 109 24
            "
						strokeWidth={1.5}
					/>

					<Path
						d="
              M88 20
              C80 7 93 2 105 5
              C104 16 97 21 88 20Z
            "
						fill={COLORS.gold}
						fillOpacity={0.1}
					/>

					<Path
						d="
              M88 36
              C80 49 93 54 105 51
              C104 40 97 35 88 36Z
            "
						fill={COLORS.gold}
						fillOpacity={0.1}
					/>

					<Path
						d="
              M118 25
              C127 11 141 13 145 22
              C135 28 126 30 118 25Z
            "
						fill={COLORS.gold}
						fillOpacity={0.1}
					/>

					<Path
						d="
              M118 31
              C127 45 141 43 145 34
              C135 28 126 26 118 31Z
            "
						fill={COLORS.gold}
						fillOpacity={0.1}
					/>

					{/* Прожилки */}
					<Path
						d="M89 20 L101 7 M89 36 L101 49"
						strokeWidth={0.6}
					/>
				</G>

				{/* Правая половина — отражение левой */}
				<G transform="translate(320 0) scale(-1 1)">
					<Path
						d="
              M68 28
              C85 28 87 8 106 10
              C121 12 121 29 109 32
              C99 34 95 23 102 19
            "
						strokeWidth={1.5}
					/>

					<Path
						d="
              M68 28
              C85 28 87 48 106 46
              C121 44 121 27 109 24
            "
						strokeWidth={1.5}
					/>

					<Path
						d="
              M88 20
              C80 7 93 2 105 5
              C104 16 97 21 88 20Z
            "
						fill={COLORS.gold}
						fillOpacity={0.1}
					/>

					<Path
						d="
              M88 36
              C80 49 93 54 105 51
              C104 40 97 35 88 36Z
            "
						fill={COLORS.gold}
						fillOpacity={0.1}
					/>

					<Path
						d="
              M118 25
              C127 11 141 13 145 22
              C135 28 126 30 118 25Z
            "
						fill={COLORS.gold}
						fillOpacity={0.1}
					/>

					<Path
						d="
              M118 31
              C127 45 141 43 145 34
              C135 28 126 26 118 31Z
            "
						fill={COLORS.gold}
						fillOpacity={0.1}
					/>

					<Path
						d="M89 20 L101 7 M89 36 L101 49"
						strokeWidth={0.6}
					/>
				</G>

				{/* Центральный цветочный медальон */}
				<Path
					d="
            M160 3
            C166 13 171 17 180 18
            C175 24 175 32 180 38
            C171 39 166 43 160 55
            C154 43 149 39 140 38
            C145 32 145 24 140 18
            C149 17 154 13 160 3Z
          "
					strokeWidth={1.6}
					fill={COLORS.gold}
					fillOpacity={0.09}
				/>

				<Path
					d="
            M160 11
            C165 20 170 22 173 28
            C168 34 165 36 160 47
            C155 36 152 34 147 28
            C150 22 155 20 160 11Z
          "
					strokeWidth={1}
				/>

				<Circle cx={160} cy={28} r={6} />
				<Circle
					cx={160}
					cy={28}
					r={2.5}
					fill={COLORS.goldLight}
				/>

				<Circle
					cx={61}
					cy={28}
					r={1.7}
					fill={COLORS.goldLight}
				/>
				<Circle
					cx={259}
					cy={28}
					r={1.7}
					fill={COLORS.goldLight}
				/>
			</G>
		</Svg>
	);
}