import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop
} from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ─── Types ──────────────────────────────────────────────────────────────────

export type PetEmotion = 'happy' | 'sad' | 'tired' | 'angry' | 'neutral';
export type PetClothing = 'none' | 'scarf' | 'shirt' | 'tie' | 'hoodie' | 'dress' | 'raincoat';
export type PetAccessory = 'none' | 'hat' | 'glasses' | 'bow' | 'crown' | 'headphone';
export type PetEarring = 'none' | 'stud' | 'hoop' | 'pearl';
export type PetEarShape = 'round' | 'pointy' | 'big' | 'floppy';
export type PetEyeShape = 'circle' | 'oval' | 'cat';

interface InteractivePetProps {
  emotion?: PetEmotion;
  clothing?: PetClothing;
  accessory?: PetAccessory;
  color?: string;         // body color
  earColor?: string;      // ear inner color (defaults to lighter body)
  eyeColor?: string;      // iris/pupil color
  accentColor?: string;   // blush, nose tint
  earShape?: PetEarShape;
  eyeShape?: PetEyeShape;
  eyeSize?: 'small' | 'medium' | 'large';
  earring?: PetEarring;
  size?: number;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function InteractivePet({
  emotion = 'happy',
  clothing = 'none',
  accessory = 'none',
  color = '#FFB7B2',
  earColor,
  eyeColor = '#1A1A2E',
  accentColor = '#E88A8A',
  earShape = 'round',
  eyeShape = 'circle',
  eyeSize = 'medium',
  earring = 'none',
  size = 200,
}: InteractivePetProps) {

  // Derived inner ear color
  const innerEar = earColor ?? lightenColor(color, 25);

  // Eye size map (SVG units)
  const eyeRadius = eyeSize === 'small' ? 10 : eyeSize === 'large' ? 16 : 13;
  const EYE_CX_L = 72, EYE_CX_R = 128, EYE_CY = 82;

  // ──────────────────────────────────────────────
  // ANIMATIONS
  // ──────────────────────────────────────────────

  const isTired = emotion === 'tired';
  const isAngry = emotion === 'angry';
  const isSad = emotion === 'sad';
  const isNormal = !isTired;

  const breathScale = useSharedValue(1);
  useEffect(() => {
    breathScale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        withTiming(1.0,  { duration: 1800, easing: Easing.inOut(Easing.sin) }),
      ),
      -1, false
    );
    return () => cancelAnimation(breathScale);
  }, []);

  const blinkY = useSharedValue(1);
  const scheduleBlink = useCallback(() => {
    const delay = 5000 + Math.random() * 5000;
    const t = setTimeout(() => {
      blinkY.value = withSequence(withTiming(0.05, { duration: 70 }), withTiming(1, { duration: 80 }));
      scheduleBlink();
    }, delay);
    return t;
  }, []);
  useEffect(() => {
    const t = scheduleBlink();
    return () => clearTimeout(t);
  }, [scheduleBlink]);

  const pupilX = useSharedValue(0);
  const scheduleLook = useCallback(() => {
    const delay = 3500 + Math.random() * 4000;
    const t = setTimeout(() => {
      const dir = Math.random() > 0.5 ? 3.5 : -3.5;
      pupilX.value = withSequence(
        withTiming(dir, { duration: 220, easing: Easing.out(Easing.quad) }),
        withDelay(700, withTiming(0, { duration: 220, easing: Easing.in(Easing.quad) }))
      );
      scheduleLook();
    }, delay);
    return t;
  }, []);
  useEffect(() => {
    const t = scheduleLook();
    return () => clearTimeout(t);
  }, [scheduleLook]);

  const floatY = useSharedValue(0);
  useEffect(() => {
    if (emotion === 'tired') {
      floatY.value = withRepeat(
        withSequence(withTiming(-7, { duration: 2000, easing: Easing.inOut(Easing.sin) }), withTiming(0, { duration: 2000 })),
        -1, false
      );
    } else {
      cancelAnimation(floatY);
      floatY.value = withTiming(0, { duration: 300 });
    }
  }, [emotion]);

  const bodyScaleProps = useAnimatedProps(() => ({
    // Center of body is approx 100, 120
    transform: [
      { translateX: 100 },
      { translateY: 120 },
      { scale: breathScale.value },
      { translateX: -100 },
      { translateY: -120 }
    ]
  }));

  const blinkProps = useAnimatedProps(() => ({
     // For blink, we scale around the eye Y center
    transform: [
      { translateY: EYE_CY },
      { scaleY: blinkY.value },
      { translateY: -EYE_CY }
    ]
  }));

  const pupilProps = useAnimatedProps(() => ({
    transform: [{ translateX: pupilX.value }]
  }));

  const containerStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    transform: [{ translateY: floatY.value }]
  }));

  // ──────────────────────────────────────────────
  // SVG SUB-RENDERS
  // ──────────────────────────────────────────────

  const renderClothing = () => {
    switch (clothing) {
      case 'scarf':
        return (
          <G id="scarf">
            <Path d="M42 132 Q100 155 158 132 Q158 145 100 162 Q42 145 42 132 Z" fill="#E53E3E" />
            <Path d="M45 136 Q100 152 155 136" stroke="#C53030" strokeWidth="1.5" fill="none" opacity="0.4" />
            <Path d="M86 142 L114 142 L108 178 L92 178 Z" fill="#C53030" />
            <Path d="M92 178 L88 185 M97 178 L95 185 M103 178 L105 185 M108 178 L112 185" stroke="#9B2C2C" strokeWidth="1.2" />
          </G>
        );
      case 'shirt':
        return (
          <G id="shirt">
            <Path d="M48 142 Q100 158 152 142 L158 192 Q100 205 42 192 Z" fill="#4299E1" />
            <Path d="M88 142 L100 152 L112 142" stroke="#2B6CB0" strokeWidth="2" fill="none" />
            <Circle cx="100" cy="162" r="2.5" fill="white" opacity="0.6" />
            <Circle cx="100" cy="175" r="2.5" fill="white" opacity="0.6" />
            <Circle cx="100" cy="188" r="2.5" fill="white" opacity="0.6" />
          </G>
        );
      case 'tie':
        return (
          <G id="tie" transform="translate(93, 138)">
            <Path d="M4 0 L10 0 L14 5 L7 8 L0 5 Z" fill="#6B46C1" />
            <Path d="M4 8 L0 30 L7 38 L14 30 L10 8 Z" fill="#553C9A" />
          </G>
        );
      case 'hoodie':
        return (
          <G id="hoodie">
            <Path d="M40 140 Q100 158 160 140 L165 195 Q100 210 35 195 Z" fill="#718096" />
            <Rect x="80" y="168" width="40" height="18" rx="8" fill="#4A5568" opacity="0.6" />
            <Circle cx="94" cy="142" r="3" fill="#A0AEC0" />
            <Circle cx="106" cy="142" r="3" fill="#A0AEC0" />
            <Path d="M94 145 L90 154 M106 145 L110 154" stroke="#A0AEC0" strokeWidth="1.5" />
          </G>
        );
      case 'dress':
        return (
          <G id="dress">
            <Path d="M35 138 Q100 155 165 138 L185 200 Q100 215 15 200 Z" fill="#F687B3" />
            <Path d="M55 122 Q100 135 145 122 L150 148 Q100 162 50 148 Z" fill="#ED64A6" />
            <Path d="M88 128 Q100 118 112 128 Q100 133 88 128 Z" fill="#FEB2D6" />
          </G>
        );
      case 'raincoat':
        return (
          <G id="raincoat">
            <Path d="M42 138 Q100 155 158 138 L162 194 Q100 207 38 194 Z" fill="#ECC94B" />
            <Rect x="97" y="148" width="6" height="35" rx="3" fill="#D69E2E" opacity="0.5" />
            <Circle cx="100" cy="155" r="3" fill="#B7791F" />
            <Circle cx="100" cy="167" r="3" fill="#B7791F" />
            <Circle cx="100" cy="179" r="3" fill="#B7791F" />
          </G>
        );
      default: return null;
    }
  };

  const renderAccessory = () => {
    switch (accessory) {
      case 'hat':
        return (
          <G id="hat">
            <Ellipse cx="100" cy="45" rx="46" ry="9" fill="#2D2D2D" />
            <Rect x="65" y="8" width="70" height="38" rx="10" fill="#1A1A1A" />
            <Rect x="65" y="38" width="70" height="6" rx="3" fill="#E53E3E" />
          </G>
        );
      case 'crown':
        return (
          <G id="crown">
            <Path d="M65 44 L70 24 L85 39 L100 17 L115 39 L130 24 L135 44 Z" fill="#F6AD55" />
            <Rect x="65" y="41" width="70" height="8" rx="4" fill="#ED8936" />
            <Circle cx="100" cy="23" r="5" fill="#FC8181" />
            <Circle cx="75" cy="37" r="4" fill="#68D391" />
            <Circle cx="125" cy="37" r="4" fill="#63B3ED" />
          </G>
        );
      case 'glasses':
        return (
          <G id="glasses" transform="translate(51, 72)">
            <Circle cx="21" cy="10" r="18" stroke="#2D3748" strokeWidth="4.5" fill="rgba(66,153,225,0.15)" />
            <Circle cx="77" cy="10" r="18" stroke="#2D3748" strokeWidth="4.5" fill="rgba(66,153,225,0.15)" />
            <Path d="M38 10 Q49 4 60 10" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round" />
            <Path d="M0 10 L-8 8" stroke="#2D3748" strokeWidth="3" strokeLinecap="round" />
            <Path d="M94 10 L102 8" stroke="#2D3748" strokeWidth="3" strokeLinecap="round" />
            <Path d="M10 4 Q16 0 22 5" stroke="white" strokeWidth="2.5" fill="none" opacity="0.4" />
            <Path d="M66 4 Q72 0 78 5" stroke="white" strokeWidth="2.5" fill="none" opacity="0.4" />
          </G>
        );
      case 'bow':
        return (
          <G id="bow" transform="translate(118, 42)">
            <Ellipse cx="0" cy="0" rx="14" ry="10" fill="#F687B3" transform="rotate(-25)" />
            <Ellipse cx="18" cy="-4" rx="14" ry="10" fill="#F687B3" transform="rotate(25 18 -4)" />
            <Circle cx="9" cy="-2" r="6" fill="#D53F8C" />
          </G>
        );
      case 'headphone':
        return (
          <G id="headphone">
            <Path d="M52 65 Q52 38 100 38 Q148 38 148 65" stroke="#2D3748" strokeWidth="8" fill="none" strokeLinecap="round" />
            <Circle cx="50" cy="68" r="16" fill="#2D3748" />
            <Circle cx="150" cy="68" r="16" fill="#2D3748" />
          </G>
        );
      default: return null;
    }
  };

  const renderEars = () => {
    switch (earShape) {
      case 'pointy':
        return (
          <G id="ears">
            <Path d="M42 62 L52 28 L72 62 Z" fill={color} />
            <G transform="translate(8, 4)"><Path d="M42 62 L52 28 L72 62 Z" fill={innerEar} opacity="0.5" scale="0.7" /></G>
            <Path d="M128 62 L148 28 L158 62 Z" fill={color} />
            <G transform="translate(88, 4)"><Path d="M42 62 L52 28 L72 62 Z" fill={innerEar} opacity="0.5" scale="0.7" /></G>
          </G>
        );
      case 'big':
        return (
          <G id="ears">
            <Circle cx="42" cy="50" r="28" fill={color} />
            <Circle cx="42" cy="50" r="18" fill={innerEar} />
            <Circle cx="158" cy="50" r="28" fill={color} />
            <Circle cx="158" cy="50" r="18" fill={innerEar} />
          </G>
        );
      case 'floppy':
        return (
          <G id="ears">
            <Path d="M38 55 Q28 45 35 20 Q50 15 62 45 Q68 60 55 70 Z" fill={color} />
            <Path d="M45 55 Q38 48 43 28 Q52 22 60 46 Q64 58 54 66 Z" fill={innerEar} />
            <Path d="M162 55 Q172 45 165 20 Q150 15 138 45 Q132 60 145 70 Z" fill={color} />
            <Path d="M155 55 Q162 48 157 28 Q148 22 140 46 Q136 58 146 66 Z" fill={innerEar} />
          </G>
        );
      default:
        return (
          <G id="ears">
            <Circle cx="52" cy="48" r="24" fill={color} />
            <Circle cx="52" cy="48" r="15" fill={innerEar} />
            <Circle cx="148" cy="48" r="24" fill={color} />
            <Circle cx="148" cy="48" r="15" fill={innerEar} />
          </G>
        );
    }
  };

  const renderEarrings = () => {
    if (earring === 'none') return null;
    const pos = (() => {
      switch (earShape) {
        case 'pointy': return { lx: 45, ly: 60, rx: 155, ry: 60 };
        case 'big': return { lx: 18, ly: 58, rx: 182, ry: 58 };
        case 'floppy': return { lx: 38, ly: 55, rx: 162, ry: 55 };
        default: return { lx: 30, ly: 50, rx: 170, ry: 50 };
      }
    })();
    const s = (cx: number, cy: number) => {
      if (earring === 'stud') return <Circle cx={cx} cy={cy} r="3.5" fill="#FFD700" />;
      if (earring === 'hoop') return <Circle cx={cx} cy={cy + 3} r="5" fill="none" stroke="#FFD700" strokeWidth="2" />;
      return (
        <G>
          <Circle cx={cx} cy={cy + 6} r="4.5" fill="white" />
          <Rect x={cx - 0.5} y={cy} width="1" height="6" fill="#666" />
        </G>
      );
    };
    return <G id="earrings">{s(pos.lx, pos.ly)}{s(pos.rx, pos.ry)}</G>;
  };

  const renderEyesSVG = () => {
    if (!isNormal) return null;
    const renderOne = (cx: number, id: string) => {
      const r = eyeRadius;
      const bRad = eyeShape === 'oval' ? r * 0.7 : eyeShape === 'cat' ? r * 0.15 : r;
      return (
        <AnimatedG animatedProps={blinkProps}>
          <Defs>
            <ClipPath id={id}><Rect x={cx - r} y={EYE_CY - r} width={r * 2} height={r * 2} rx={bRad} /></ClipPath>
          </Defs>
          <Rect x={cx - r} y={EYE_CY - r} width={r * 2} height={r * 2} rx={bRad} fill={eyeColor} />
          <AnimatedG clipPath={`url(#${id})`} animatedProps={pupilProps}>
            <Circle cx={cx - r * 0.3} cy={EYE_CY - r * 0.5} r={r * 0.35} fill="white" />
            <Circle cx={cx - r * 0.6} cy={EYE_CY + r * 0.3} r={r * 0.22} fill="white" opacity="0.6" />
          </AnimatedG>
        </AnimatedG>
      );
    };
    return <G id="eyes">{renderOne(EYE_CX_L, "eL")}{renderOne(EYE_CX_R, "eR")}</G>;
  };

  const renderSvgFaceExtras = () => {
    if (isTired) return (
      <G><Rect x="57" y="80" width="32" height="7" rx="3.5" fill={eyeColor} />
        <Rect x="111" y="80" width="32" height="7" rx="3.5" fill={eyeColor} /></G>
    );
    if (isAngry) return (
      <G><Path d="M56 64 L86 72" stroke={eyeColor} strokeWidth="5" strokeLinecap="round" />
        <Path d="M114 72 L144 64" stroke={eyeColor} strokeWidth="5" strokeLinecap="round" /></G>
    );
    if (isSad) return (
      <G><Path d="M60 66 Q72 58 84 66" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" />
        <Path d="M116 66 Q128 58 140 66" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" /></G>
    );
    return null;
  };

  const renderMouth = () => {
    const mc = accentColor;
    if (isSad) return <Path d="M86 118 Q100 108 114 118" stroke={mc} strokeWidth="3.5" fill="none" strokeLinecap="round" />;
    if (isAngry) return <Path d="M86 116 Q100 110 114 116" stroke={mc} strokeWidth="3.5" fill="none" strokeLinecap="round" />;
    return <Path d="M80 108 Q100 128 120 108" stroke={mc} strokeWidth="3.5" fill="none" strokeLinecap="round" />;
  };

  return (
    <Animated.View style={containerStyle}>
      <Svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        <Defs>
          <LinearGradient id="bT" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor={lightenColor(color, 15)} /><Stop offset="1" stopColor={color} /></LinearGradient>
          <LinearGradient id="bB" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor={color} /><Stop offset="1" stopColor={darkenColor(color, 8)} /></LinearGradient>
        </Defs>

        <AnimatedG animatedProps={bodyScaleProps}>
          <Ellipse cx="100" cy="188" rx="52" ry="7" fill="rgba(0,0,0,0.07)" />
          {renderEars()}
          <Ellipse cx="100" cy="148" rx="62" ry="48" fill="url(#bB)" />
          <Ellipse cx="100" cy="92" rx="56" ry="52" fill="url(#bT)" />
          
          {renderClothing()}

          <G id="face">
            <Ellipse cx="62" cy="103" rx="14" ry="8" fill={accentColor} opacity="0.2" />
            <Ellipse cx="138" cy="103" rx="14" ry="8" fill={accentColor} opacity="0.2" />
            <Ellipse cx="100" cy="97" rx="7" ry="4" fill={darkenColor(accentColor, 15)} opacity="0.6" />
            {renderSvgFaceExtras()}
            {renderMouth()}
          </G>

          {renderEyesSVG()}

          <Ellipse cx="70" cy="183" rx="20" ry="10" fill={darkenColor(color, 5)} />
          <Ellipse cx="130" cy="183" rx="20" ry="10" fill={darkenColor(color, 5)} />
          
          {renderEarrings()}
          {renderAccessory()}
        </AnimatedG>
      </Svg>
    </Animated.View>
  );
}

function lightenColor(hex: string, amount: number): string { return adjustColor(hex, amount); }
function darkenColor(hex: string, amount: number): string { return adjustColor(hex, -amount); }
function adjustColor(hex: string, amount: number): string {
  if (!hex || hex[0] !== '#') return hex;
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}
