
import { StyleSheet, View } from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    Path,
} from 'react-native-svg';

import { COLORS } from '../../../shared/styles/style';

type CornerProps = {
  size?: number;
  opacity?: number;
};

type CornerPieceProps = {
  flipX?: boolean;
  flipY?: boolean;
};

const CORNER_SIZE = 72;

// Новый ажурный орнамент
function GoldenCorner({
  size = CORNER_SIZE,
  opacity = 0.95,
}: CornerProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
    >
      <G
        opacity={opacity}
        stroke={COLORS.gold}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Тонкая угловая линия */}
        {/* <Path
          d="
            M1 135
            V35
            Q1 1 35 1
            H135
          "
          strokeWidth={1.1}
        /> */}

        {/* Плавная ажурная ветвь */}
        <Path
          d="
            M1 151
            C25 134 18 112 40 95
            C60 80 80 88 94 67
            C109 44 100 20 149 1
          "
          strokeWidth={1.45}
        />

        {/* Вторая тонкая переплетённая линия */}
        <Path
          d="
            M4 157
            C34 137 28 116 49 101
            C70 86 90 94 104 72
            C121 45 113 25 157 5
          "
          stroke={COLORS.goldLight}
          strokeWidth={0.6}
          opacity={0.7}
        />

        {/* Нижний декоративный завиток */}
        <Path
          d="
            M22 122
            C37 137 62 130 67 111
            C72 93 55 84 45 95
            C36 105 45 117 54 111
            C60 107 55 101 50 105
          "
          strokeWidth={1.1}
        />

        {/* Верхний декоративный завиток */}
        <Path
          d="
            M87 72
            C103 84 124 73 123 54
            C122 39 107 35 100 46
            C94 56 106 64 113 55
            C117 49 111 45 107 50
          "
          strokeWidth={1.1}
        />

        {/* Ветви с листьями */}
        <G strokeWidth={0.9}>
          <Path d="M40 95 C25 90 18 77 21 63" />
          <Path d="M67 83 C56 67 62 51 75 40" />
          <Path d="M100 57 C90 43 95 27 109 17" />
        </G>

        {/* Листья */}
        <G
          fill={COLORS.gold}
          fillOpacity={0.12}
          stroke={COLORS.goldLight}
          strokeWidth={0.85}
        >
          <Path
            d="
              M40 95
              C25 93 14 102 11 115
              C27 114 37 106 40 95Z
            "
          />

          <Path
            d="
              M43 92
              C32 79 37 65 49 59
              C55 73 52 85 43 92Z
            "
          />

          <Path
            d="
              M67 83
              C81 69 95 71 103 80
              C89 90 76 91 67 83Z
            "
          />

          <Path
            d="
              M71 78
              C62 63 69 50 82 45
              C86 59 82 70 71 78Z
            "
          />

          <Path
            d="
              M100 57
              C114 52 126 60 129 70
              C114 71 103 65 100 57Z
            "
          />

          <Path
            d="
              M103 51
              C94 37 100 24 113 18
              C117 32 113 44 103 51Z
            "
          />
        </G>

        {/* Маленький цветочный элемент */}
        <G
          transform="translate(28 28)"
          stroke={COLORS.goldLight}
          strokeWidth={0.85}
          fill={COLORS.gold}
          fillOpacity={0.08}
        >
          <Path
            d="
              M0 -11
              C4 -6 6 -6 9 -9
              C7 -4 7 -3 12 0
              C7 3 7 4 9 9
              C6 6 4 6 0 11
              C-4 6 -6 6 -9 9
              C-7 4 -7 3 -12 0
              C-7 -3 -7 -4 -9 -9
              C-6 -6 -4 -6 0 -11Z
            "
          />

          <Circle cx={0} cy={0} r={3} />
          <Circle
            cx={0}
            cy={0}
            r={1.2}
            fill={COLORS.goldLight}
          />
        </G>

        {/* Маленькие капли и точки */}
        <G fill={COLORS.goldLight} stroke="none">
          <Ellipse cx={14} cy={130} rx={1.3} ry={2.5} />
          <Ellipse cx={135} cy={15} rx={1.3} ry={2.5} />

          <Circle cx={20} cy={60} r={1.2} />
          <Circle cx={77} cy={36} r={1.2} />
          <Circle cx={129} cy={51} r={1.2} />
        </G>
      </G>
    </Svg>
  );
}

// Отражение одного узора
function CornerPiece({
  flipX = false,
  flipY = false,
}: CornerPieceProps) {
  return (
    <View
      pointerEvents="none"
      style={{
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        transform: [
          { scaleX: flipX ? -1 : 1 },
          { scaleY: flipY ? -1 : 1 },
        ],
      }}
    >
      <GoldenCorner
        size={CORNER_SIZE}
        opacity={0.95}
      />
    </View>
  );
}

// Два угла в одной строке
export default function CornerRow({
  bottom = false,
}: {
  bottom?: boolean;
}) {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.cornerRow,
        bottom && styles.cornerRowBottom,
      ]}
    >
      <CornerPiece flipY={bottom} />
      <CornerPiece flipX flipY={bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  cornerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -18,
    marginBottom: -70,
  },

  cornerRowBottom: {
    marginTop: 16,
    marginBottom: 0,
  },
});
