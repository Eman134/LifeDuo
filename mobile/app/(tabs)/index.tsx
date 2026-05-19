import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useRef } from 'react';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

import { InteractivePet } from '@/components/InteractivePet';

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bgMain = isDark ? 'bg-[#121212]' : 'bg-[#FFF5F7]';
  const cardWhite = isDark ? 'bg-[#1E1E1E]' : 'bg-white';
  const textDark = isDark ? 'text-white' : 'text-[#2D3748]';
  const textMutated = isDark ? 'text-gray-400' : 'text-[#718096]';
  const activityBg = isDark ? 'bg-[#2A2A2A]' : 'bg-[#FCF0F2]';

  type PetEmotion = 'happy' | 'sad' | 'tired' | 'angry' | 'neutral';
  const [petEmotion, setPetEmotion] = React.useState<PetEmotion>('happy');

  // ── Customization ─────────────────────────────────────────
  const bodyColors = ['#FFB7B2', '#B2D4FF', '#B2FFD0', '#FFE8B2', '#D4B2FF', '#FFB2D9', '#B2EEFF'];
  const eyeColorOpts = ['#1A1A2E', '#5C4B3A', '#1A6B3A', '#1A3B6B', '#6B1A6B', '#8B1A1A'];

  type ClothId = 'none' | 'scarf' | 'shirt' | 'tie' | 'hoodie' | 'dress' | 'raincoat';
  type AccId = 'none' | 'hat' | 'glasses' | 'bow' | 'crown' | 'headphone';
  type EarShapeId = 'round' | 'pointy' | 'big' | 'floppy';
  type PetEarring = 'none' | 'stud' | 'hoop' | 'pearl';
  type EyeShapeId = 'circle' | 'oval' | 'cat';
  type EyeSizeId = 'small' | 'medium' | 'large';

  const clothOptions: Array<{ id: ClothId; label: string; icon: string; color: string }> = [
    { id: 'none', label: 'Nenhuma', icon: 'close-circle-outline', color: '#90A4AE' },
    { id: 'scarf', label: 'Cachecol', icon: 'scarf', color: '#EF5350' },
    { id: 'shirt', label: 'Camiseta', icon: 'tshirt-crew', color: '#42A5F5' },
    { id: 'tie', label: 'Gravata', icon: 'tie', color: '#5C6BC0' },
    { id: 'hoodie', label: 'Moletom', icon: 'hoodie', color: '#718096' },
    { id: 'dress', label: 'Vestido', icon: 'tshirt-v', color: '#F687B3' },
    { id: 'raincoat', label: 'Capa', icon: 'weather-rainy', color: '#ECC94B' },
  ];
  const accOptions: Array<{ id: AccId; label: string; icon: string; color: string }> = [
    { id: 'none', label: 'Nenhum', icon: 'close-circle-outline', color: '#90A4AE' },
    { id: 'hat', label: 'Chapéu', icon: 'hat-fedora', color: '#795548' },
    { id: 'glasses', label: 'Óculos', icon: 'glasses', color: '#42A5F5' },
    { id: 'bow', label: 'Laço', icon: 'bow-tie', color: '#EC407A' },
    { id: 'crown', label: 'Coroa', icon: 'crown', color: '#F6AD55' },
    { id: 'headphone', label: 'Fone', icon: 'headphones', color: '#4A5568' },
  ];
  const earOptions: Array<{ id: EarShapeId; label: string; icon: string; color: string }> = [
    { id: 'round', label: 'Redonda', icon: 'circle-outline', color: '#90A4AE' },
    { id: 'pointy', label: 'Pontuda', icon: 'triangle-outline', color: '#BA68C8' },
    { id: 'big', label: 'Grande', icon: 'circle', color: '#66BB6A' },
    { id: 'floppy', label: 'Caída', icon: 'leaf', color: '#FF8A65' },
  ];
  const eyeShapeOptions: Array<{ id: EyeShapeId; label: string; icon: string; color: string }> = [
    { id: 'circle', label: 'Redondo', icon: 'circle-outline', color: '#64B5F6' },
    { id: 'oval', label: 'Oval', icon: 'oval', color: '#9575CD' },
    { id: 'cat', label: 'Gatinho', icon: 'cat', color: '#EC407A' },
  ];
  const eyeSizeOptions: Array<{ id: EyeSizeId; label: string; icon: string; color: string }> = [
    { id: 'small', label: 'Pequeno', icon: 'circle-small', color: '#90A4AE' },
    { id: 'medium', label: 'Médio', icon: 'circle-medium', color: '#42A5F5' },
    { id: 'large', label: 'Grande', icon: 'circle', color: '#5C6BC0' },
  ];

  const [bodyColor, setBodyColor] = React.useState('#FFB7B2');
  const [eyeColor, setEyeColor] = React.useState('#1A1A2E');
  const [clothing, setClothing] = React.useState<ClothId>('none');
  const [accessory, setAccessory] = React.useState<AccId>('none');
  const [earShape, setEarShape] = React.useState<EarShapeId>('round');
  const [eyeShape, setEyeShape] = React.useState<EyeShapeId>('circle');
  const [eyeSize, setEyeSize] = React.useState<EyeSizeId>('medium');
  const [earring, setEarring] = React.useState<PetEarring>('none');
  const [wardrobeOpen, setWardrobeOpen] = React.useState(false);
  const [wardrobeTab, setWardrobeTab] = React.useState<'appearance' | 'eyes' | 'clothes' | 'accessories'>('appearance');

  // ── Check-in selection ──────────────────────────────────────
  const [situacaoSel, setSituacaoSel] = React.useState<string | null>(null);
  const [emocaoSel, setEmocaoSel] = React.useState<string | null>(null);

  const onCheckIn = (emotionValue: PetEmotion) => {
    setPetEmotion(emotionValue);
  };

  const XP_PERCENT = 48;

  // Wardrobe icon/grid row helper
  const WardrobeRow = ({ label, options, selected, onSelect }: {
    label: string;
    options: Array<{ id: string; label: string; icon: string; color: string }>;
    selected: string;
    onSelect: (id: string) => void;
  }) => (
    <View className="mb-5">
      <Text className={`text-xs font-bold mb-2 tracking-widest uppercase`} style={{ color: isDark ? '#777' : '#94A3B8' }}>{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map(opt => (
          <TouchableOpacity
            key={opt.id}
            onPress={() => onSelect(opt.id)}
            className="items-center"
            style={{ width: 56 }}
          >
            <View
              className="w-14 h-14 rounded-2xl items-center justify-center mb-1"
              style={[
                { backgroundColor: opt.color + '18' },
                selected === opt.id && { borderWidth: 2.5, borderColor: opt.color },
              ]}
            >
              <MaterialCommunityIcons
                name={opt.icon as any}
                size={24}
                color={selected === opt.id ? opt.color : isDark ? '#555' : '#9CA3AF'}
              />
            </View>
            <Text className="text-[8px] font-bold text-center" style={{ color: selected === opt.id ? opt.color : isDark ? '#555' : '#94A3B8' }}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Color dot row helper
  const ColorRow = ({ label, colors, selected, onSelect }: {
    label: string; colors: string[]; selected: string; onSelect: (c: string) => void;
  }) => (
    <View className="mb-5">
      <Text className={`text-xs font-bold mb-2 tracking-widest uppercase`} style={{ color: isDark ? '#777' : '#94A3B8' }}>{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {colors.map(c => (
          <TouchableOpacity
            key={c}
            onPress={() => onSelect(c)}
            style={[
              { width: 36, height: 36, borderRadius: 18, backgroundColor: c },
              selected === c && { borderWidth: 3, borderColor: '#FFB7B2', transform: [{ scale: 1.2 }] },
            ]}
          />
        ))}
      </View>
    </View>
  );

  // ── Mini SVG Ear Preview ──────────────────────────────────────
  const EarPreview = ({ shape, color }: { shape: EarShapeId; color: string }) => {
    const inner = lightenColor(color, 25);
    return (
      <Svg width={52} height={52} viewBox="0 0 200 160">
        {shape === 'round' && (
          <>
            <Circle cx="52" cy="48" r="24" fill={color} />
            <Circle cx="52" cy="48" r="15" fill={inner} />
            <Circle cx="148" cy="48" r="24" fill={color} />
            <Circle cx="148" cy="48" r="15" fill={inner} />
          </>
        )}
        {shape === 'pointy' && (
          <>
            <Path d="M42 62 L52 28 L72 62 Z" fill={color} />
            <Path d="M50 58 L57 36 L67 58 Z" fill={inner} />
            <Path d="M128 62 L148 28 L158 62 Z" fill={color} />
            <Path d="M133 58 L143 36 L150 58 Z" fill={inner} />
          </>
        )}
        {shape === 'big' && (
          <>
            <Circle cx="42" cy="50" r="28" fill={color} />
            <Circle cx="42" cy="50" r="18" fill={inner} />
            <Circle cx="158" cy="50" r="28" fill={color} />
            <Circle cx="158" cy="50" r="18" fill={inner} />
          </>
        )}
        {shape === 'floppy' && (
          <>
            <Path d="M38 55 Q28 45 35 20 Q50 15 62 45 Q68 60 55 70 Z" fill={color} />
            <Path d="M45 55 Q38 48 43 28 Q52 22 60 46 Q64 58 54 66 Z" fill={inner} />
            <Path d="M162 55 Q172 45 165 20 Q150 15 138 45 Q132 60 145 70 Z" fill={color} />
            <Path d="M155 55 Q162 48 157 28 Q148 22 140 46 Q136 58 146 66 Z" fill={inner} />
          </>
        )}
        <Ellipse cx="100" cy="92" rx="56" ry="52" fill={color} />
      </Svg>
    );
  };

  // ── Mini SVG Eye Preview ──────────────────────────────────────
  const EyePreview = ({ shape, size, color }: { shape: EyeShapeId; size: EyeSizeId; color: string }) => {
    const r = size === 'small' ? 10 : size === 'large' ? 16 : 13;
    const bRad = shape === 'oval' ? r * 0.7 : shape === 'cat' ? r * 0.15 : r;
    return (
      <Svg width={52} height={52} viewBox="0 0 200 160">
        {/* Subtle head silhouette for context */}
        <Ellipse cx="100" cy="92" rx="56" ry="52" fill={color} opacity="0.12" />

        {/* Left eye */}
        <Rect x={72 - r} y={82 - r} width={r * 2} height={r * 2} rx={bRad} fill={color} />
        <Circle cx={72 - r * 0.3} cy={82 - r * 0.5} r={r * 0.35} fill="white" />
        <Circle cx={72 - r * 0.6} cy={82 + r * 0.3} r={r * 0.22} fill="white" opacity="0.6" />

        {/* Right eye */}
        <Rect x={128 - r} y={82 - r} width={r * 2} height={r * 2} rx={bRad} fill={color} />
        <Circle cx={128 - r * 0.3} cy={82 - r * 0.5} r={r * 0.35} fill="white" />
        <Circle cx={128 - r * 0.6} cy={82 + r * 0.3} r={r * 0.22} fill="white" opacity="0.6" />
      </Svg>
    );
  };

  return (
    <>
      {/* ── Wardrobe Modal ─────────────────────────────────── */}
      <Modal visible={wardrobeOpen} animationType="slide" transparent onRequestClose={() => setWardrobeOpen(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{
            backgroundColor: isDark ? '#161616' : '#F8F8FC',
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
            maxHeight: '90%',
            overflow: 'hidden',
          }}>

            {/* ─ Handle ─ */}
            <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 4 }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: isDark ? '#444' : '#E2E8F0' }} />
            </View>

            {/* ─ Header row ─ */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: '900', color: isDark ? '#FFF' : '#2D3748' }}>Guarda-Roupa 🎀</Text>
              <TouchableOpacity onPress={() => setWardrobeOpen(false)}>
                <MaterialCommunityIcons name="close-circle" size={28} color={isDark ? '#555' : '#CBD5E0'} />
              </TouchableOpacity>
            </View>

            {/* ─ Live Pet Preview ─ */}
            <View style={{
              alignItems: 'center',
              paddingVertical: 12,
              marginHorizontal: 24,
              borderRadius: 28,
              backgroundColor: isDark ? '#1E1E1E' : '#FFF0F5',
              marginBottom: 4,
            }}>
              <InteractivePet
                emotion={petEmotion}
                color={bodyColor}
                eyeColor={eyeColor}
                size={140}
                clothing={clothing}
                accessory={accessory}
                earShape={earShape}
                eyeShape={eyeShape}
                eyeSize={eyeSize}
                earring={earring}
              />
            </View>

            {/* ─ Pill Tab Bar ─ */}
            <View style={{
              flexDirection: 'row', marginHorizontal: 16, marginTop: 12, marginBottom: 2,
              backgroundColor: isDark ? '#252525' : '#EDEEF3',
              borderRadius: 20, padding: 4, gap: 2,
            }}>
              {([
                { id: 'appearance', label: 'Apar.', icon: 'palette' },
                { id: 'eyes', label: 'Olhos', icon: 'eye' },
                { id: 'clothes', label: 'Roupa', icon: 'tshirt-crew' },
                { id: 'accessories', label: 'Extras', icon: 'hat-fedora' },
              ] as const).map(tab => {
                const active = wardrobeTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => setWardrobeTab(tab.id)}
                    style={{
                      flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 16, gap: 2,
                      backgroundColor: active ? '#E879A0' : 'transparent',
                      shadowColor: active ? '#E879A0' : undefined,
                      shadowOffset: active ? { width: 0, height: 3 } : undefined,
                      shadowOpacity: active ? 0.4 : 0,
                      shadowRadius: active ? 5 : 0,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={tab.icon as any} size={18}
                      color={active ? 'white' : isDark ? '#555' : '#9CA3AF'}
                    />
                    <Text style={{
                      fontSize: 9, fontWeight: '800',
                      color: active ? 'white' : isDark ? '#555' : '#9CA3AF',
                      letterSpacing: 0.3,
                    }}>{tab.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ─ Tab Content ─ */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 36 }}
              style={{ maxHeight: 260 }}
            >
              {/* APARÊNCIA */}
              {wardrobeTab === 'appearance' && (
                <View>
                  <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 1.2, color: isDark ? '#555' : '#CBD5E0', marginBottom: 10 }}>COR DO MASCOTE</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                    {bodyColors.map(c => (
                      <TouchableOpacity key={c} onPress={() => setBodyColor(c)}>
                        <View style={{
                          width: 44, height: 44, borderRadius: 22, backgroundColor: c,
                          borderWidth: bodyColor === c ? 3.5 : 0,
                          borderColor: '#E879A0',
                          alignItems: 'center', justifyContent: 'center',
                          shadowColor: c, shadowOffset: { width: 0, height: 3 }, shadowOpacity: bodyColor === c ? 0.6 : 0, shadowRadius: 5,
                        }}>
                          {bodyColor === c && <Text style={{ color: 'white', fontSize: 16, fontWeight: '900' }}>✓</Text>}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 1.2, color: isDark ? '#555' : '#CBD5E0', marginBottom: 10 }}>FORMATO DAS ORELHAS</Text>
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
                    {earOptions.map(opt => {
                      const sel = earShape === opt.id;
                      return (
                        <TouchableOpacity key={opt.id} onPress={() => setEarShape(opt.id)} style={{ flex: 1, alignItems: 'center' }}>
                          <View style={{
                            width: '100%', height: 50, borderRadius: 14, overflow: 'hidden',
                            borderWidth: sel ? 2.5 : 1.5,
                            borderColor: sel ? '#E879A0' : isDark ? '#333' : '#E8ECF0',
                            backgroundColor: sel ? '#E879A010' : isDark ? '#1E1E1E' : 'white',
                            justifyContent: 'center', alignItems: 'center'
                          }}>
                            <EarPreview shape={opt.id} color={bodyColor} />
                          </View>
                          <Text style={{ fontSize: 8, fontWeight: '800', marginTop: 5, color: sel ? '#E879A0' : isDark ? '#555' : '#94A3B8' }}>{opt.label}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 1.2, color: isDark ? '#555' : '#CBD5E0', marginBottom: 10 }}>BRINCOS</Text>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    {([
                      { id: 'none',  label: 'Nenhum', color: '#90A4AE', emoji: '✕' },
                      { id: 'stud',  label: 'Ponto',  color: '#FFD700', emoji: '✨' },
                      { id: 'hoop',  label: 'Argola', color: '#FFD700', emoji: '💍' },
                      { id: 'pearl', label: 'Pérola', color: '#FFFFFF', emoji: '⚪' },
                    ] as const).map(opt => {
                      const sel = earring === opt.id;
                      return (
                        <TouchableOpacity key={opt.id} onPress={() => setEarring(opt.id)} style={{ flex: 1, alignItems: 'center' }}>
                          <View style={{
                            width: '100%', height: 44, borderRadius: 12,
                            backgroundColor: sel ? '#E879A0' + '18' : isDark ? '#252525' : '#F1F3F5',
                            borderWidth: sel ? 2.5 : 0, borderColor: '#E879A0',
                            justifyContent: 'center', alignItems: 'center',
                            shadowColor: '#E879A0', shadowOffset: { width: 0, height: 2 }, shadowOpacity: sel ? 0.3 : 0, shadowRadius: 4,
                          }}>
                            <Text style={{ fontSize: 18, opacity: sel ? 1 : 0.6 }}>{opt.emoji}</Text>
                          </View>
                          <Text style={{ fontSize: 8, fontWeight: '800', marginTop: 5, color: sel ? '#E879A0' : isDark ? '#555' : '#94A3B8' }}>{opt.label.toUpperCase()}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* OLHOS */}
              {wardrobeTab === 'eyes' && (
                <View>
                  <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 1.2, color: isDark ? '#555' : '#CBD5E0', marginBottom: 10 }}>COR DOS OLHOS</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                    {eyeColorOpts.map(c => (
                      <TouchableOpacity key={c} onPress={() => setEyeColor(c)}>
                        <View style={{
                          width: 44, height: 44, borderRadius: 22, backgroundColor: c,
                          borderWidth: eyeColor === c ? 3.5 : 0,
                          borderColor: '#E879A0',
                          alignItems: 'center', justifyContent: 'center',
                          shadowColor: c, shadowOffset: { width: 0, height: 3 }, shadowOpacity: eyeColor === c ? 0.6 : 0, shadowRadius: 5,
                        }}>
                          {eyeColor === c && <Text style={{ color: 'white', fontSize: 16, fontWeight: '900' }}>✓</Text>}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 1.2, color: isDark ? '#555' : '#CBD5E0', marginBottom: 10 }}>FORMATO</Text>
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                    {eyeShapeOptions.map(opt => {
                      const sel = eyeShape === opt.id;
                      return (
                        <TouchableOpacity key={opt.id} onPress={() => setEyeShape(opt.id)} style={{ flex: 1, alignItems: 'center' }}>
                          <View style={{
                            borderRadius: 16, overflow: 'hidden',
                            borderWidth: sel ? 2.5 : 1.5,
                            borderColor: sel ? '#E879A0' : isDark ? '#333' : '#E8ECF0',
                            backgroundColor: sel ? '#E879A010' : isDark ? '#1E1E1E' : 'white',
                          }}>
                            <EyePreview shape={opt.id} size={eyeSize} color={eyeColor} />
                          </View>
                          <Text style={{ fontSize: 8, fontWeight: '800', marginTop: 5, color: sel ? '#E879A0' : isDark ? '#555' : '#94A3B8' }}>{opt.label}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 1.2, color: isDark ? '#555' : '#CBD5E0', marginBottom: 10 }}>TAMANHO</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    {eyeSizeOptions.map(opt => {
                      const sel = eyeSize === opt.id;
                      return (
                        <TouchableOpacity key={opt.id} onPress={() => setEyeSize(opt.id)} style={{ flex: 1, alignItems: 'center' }}>
                          <View style={{
                            borderRadius: 16, overflow: 'hidden',
                            borderWidth: sel ? 2.5 : 1.5,
                            borderColor: sel ? '#E879A0' : isDark ? '#333' : '#E8ECF0',
                            backgroundColor: sel ? '#E879A010' : isDark ? '#1E1E1E' : 'white',
                          }}>
                            <EyePreview shape={eyeShape} size={opt.id} color={eyeColor} />
                          </View>
                          <Text style={{ fontSize: 8, fontWeight: '800', marginTop: 5, color: sel ? '#E879A0' : isDark ? '#555' : '#94A3B8' }}>{opt.label}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* ROUPAS */}
              {wardrobeTab === 'clothes' && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {clothOptions.map(opt => {
                    const sel = clothing === opt.id;
                    return (
                      <TouchableOpacity key={opt.id} onPress={() => setClothing(opt.id)} style={{ width: '30%', alignItems: 'center', marginBottom: 12 }}>
                          <View style={{
                            width: '100%', height: 64, borderRadius: 18,
                            backgroundColor: opt.color,
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: sel ? 3.5 : 0, borderColor: '#E879A0',
                            opacity: sel ? 1 : 0.45,
                            shadowColor: '#E879A0', shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: sel ? 0.35 : 0, shadowRadius: 7,
                          }}>
                            <Text style={{ fontSize: 24 }}>
                              {opt.id === 'none' ? '✕' : opt.id === 'scarf' ? '🧣' : opt.id === 'shirt' ? '👕' : opt.id === 'tie' ? '👔' : opt.id === 'hoodie' ? '🧥' : opt.id === 'dress' ? '👗' : '🌧️'}
                            </Text>
                          </View>
                          <Text style={{ fontSize: 9, fontWeight: '800', marginTop: 5, letterSpacing: 0.4, color: sel ? '#E879A0' : isDark ? '#555' : '#94A3B8' }}>{opt.label.toUpperCase()}</Text>
                        </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              {/* ACESSÓRIOS */}
              {wardrobeTab === 'accessories' && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {accOptions.map(opt => {
                    const sel = accessory === opt.id;
                    return (
                      <TouchableOpacity key={opt.id} onPress={() => setAccessory(opt.id)} style={{ width: '30%', alignItems: 'center', marginBottom: 12 }}>
                          <View style={{
                            width: '100%', height: 64, borderRadius: 18,
                            backgroundColor: opt.color,
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: sel ? 3.5 : 0, borderColor: '#E879A0',
                            opacity: sel ? 1 : 0.45,
                            shadowColor: '#E879A0', shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: sel ? 0.35 : 0, shadowRadius: 7,
                          }}>
                            <Text style={{ fontSize: 24 }}>
                              {opt.id === 'none' ? '✕' : opt.id === 'hat' ? '🎩' : opt.id === 'glasses' ? '🕶️' : opt.id === 'bow' ? '🎀' : opt.id === 'crown' ? '👑' : '🎧'}
                            </Text>
                          </View>
                          <Text style={{ fontSize: 9, fontWeight: '800', marginTop: 5, letterSpacing: 0.4, color: sel ? '#E879A0' : isDark ? '#555' : '#94A3B8' }}>{opt.label.toUpperCase()}</Text>
                        </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView ref={scrollRef} className={`flex-1 ${bgMain} px-5 pt-8`} contentContainerStyle={{ paddingBottom: 120 }}>

        <View className="items-center mb-6">
          {/* Pet + wardrobe button */}
          <View className="relative">
            <InteractivePet
              emotion={petEmotion}
              color={bodyColor}
              eyeColor={eyeColor}
              size={180}
              clothing={clothing}
              accessory={accessory}
              earShape={earShape}
              eyeShape={eyeShape}
              eyeSize={eyeSize}
              earring={earring}
            />
            {/* Wardrobe button */}
            <TouchableOpacity
              onPress={() => setWardrobeOpen(true)}
              className="absolute bottom-4 -right-2 w-10 h-10 rounded-full items-center justify-center shadow-sm"
              style={{ backgroundColor: isDark ? '#2A2A2A' : '#FFFFFF' }}
            >
              <MaterialCommunityIcons name="hanger" size={20} color="#D7427C" />
            </TouchableOpacity>
          </View>

          {/* ── XP Bar ─────────────────── */}
          <View className="w-full px-1 mt-4">
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center space-x-2">
                <View className="w-6 h-6 rounded-full items-center justify-center" style={{ backgroundColor: '#D7427C' }}>
                  <Text className="text-white font-black text-[9px]">12</Text>
                </View>
                <Text className="font-bold text-sm" style={{ color: '#D7427C' }}>Nível 12</Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MaterialCommunityIcons name="star-four-points" size={12} color="#F6AD55" />
                <Text className="text-xs font-bold" style={{ color: isDark ? '#A0A0A0' : '#8898AA' }}>240 / 500 XP</Text>
              </View>
            </View>
            <View className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? '#2D2D2D' : '#F0F0F0' }}>
              <View className="h-full rounded-full" style={{ width: `${XP_PERCENT}%`, backgroundColor: '#E879A0' }}>
                <View className="absolute top-[2px] left-2 h-[4px] rounded-full bg-white opacity-40" style={{ width: `${XP_PERCENT * 0.5}%` }} />
              </View>
            </View>
            <Text className="text-[9px] font-semibold mt-1 text-right" style={{ color: isDark ? '#555' : '#CBD5E0' }}>
              +260 XP para o próximo nível
            </Text>
          </View>
        </View>

        <View className={`rounded-[32px] ${cardWhite} p-6 shadow-sm mb-6 ${isDark ? 'border border-[#333]' : 'shadow-pink-100'}`}>
          <HStack className="justify-between items-center mb-1">
            <Text className={`font-bold text-lg ${textDark} tracking-tight`}>Check-in Diário</Text>
          </HStack>

          <Text className={`text-sm font-semibold ${textDark} mt-3 mb-4`}>Sua Situação:</Text>
          <HStack className="justify-between px-2">
            <CheckInItem id="grato" icon="hand-heart" iconColor="#E879A0" label="GRATO" selected={situacaoSel === 'grato'} onPress={() => { setSituacaoSel('grato'); onCheckIn('happy'); }} />
            <CheckInItem id="amado" icon="heart-pulse" iconColor="#F06292" label="AMADO" selected={situacaoSel === 'amado'} onPress={() => { setSituacaoSel('amado'); onCheckIn('happy'); }} />
            <CheckInItem id="cansado" icon="sleep" iconColor="#9575CD" label="CANSADO" selected={situacaoSel === 'cansado'} onPress={() => { setSituacaoSel('cansado'); onCheckIn('tired'); }} />
            <CheckInItem id="animado" icon="lightning-bolt" iconColor="#FF8A65" label="ANIMADO" selected={situacaoSel === 'animado'} onPress={() => { setSituacaoSel('animado'); onCheckIn('happy'); }} />
          </HStack>

          <View className={`h-[1px] w-full my-5 ${isDark ? 'bg-[#333]' : 'bg-[#F5F5F5]'}`} />

          <Text className={`text-sm font-semibold ${textDark} mb-4`}>Sua Emoção:</Text>
          <HStack className="justify-between">
            <CheckInItem id="triste" icon="emoticon-cry-outline" iconColor="#64B5F6" label="TRISTE" selected={emocaoSel === 'triste'} onPress={() => { setEmocaoSel('triste'); onCheckIn('sad'); }} />
            <CheckInItem id="ansioso" icon="emoticon-confused-outline" iconColor="#BA68C8" label="ANSIOSO" selected={emocaoSel === 'ansioso'} onPress={() => { setEmocaoSel('ansioso'); onCheckIn('sad'); }} />
            <CheckInItem id="neutro" icon="emoticon-neutral-outline" iconColor="#90A4AE" label="NEUTRO" selected={emocaoSel === 'neutro'} onPress={() => { setEmocaoSel('neutro'); onCheckIn('neutral'); }} />
            <CheckInItem id="bravo" icon="emoticon-angry-outline" iconColor="#EF5350" label="BRAVO" selected={emocaoSel === 'bravo'} onPress={() => { setEmocaoSel('bravo'); onCheckIn('angry'); }} />
            <CheckInItem id="feliz" icon="emoticon-happy-outline" iconColor="#66BB6A" label="FELIZ" selected={emocaoSel === 'feliz'} onPress={() => { setEmocaoSel('feliz'); onCheckIn('happy'); }} />
          </HStack>
        </View>

        <View className="flex-row justify-between mb-8">
          <TouchableOpacity className="flex-1 rounded-[32px] p-5 mr-3 justify-between" style={{ backgroundColor: '#D1C4FC', minHeight: 140 }}>
            <MaterialCommunityIcons name="check-circle-outline" size={26} color="#4A5568" />
            <View className="mt-4">
              <Text className="text-3xl font-black text-[#2D3748] tracking-tighter leading-none mb-0.5">3/5</Text>
              <Text className="text-[10px] font-bold text-[#4A5568] tracking-widest uppercase opacity-80">Tarefas Feitas</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 rounded-[32px] p-5 ml-1 justify-between" style={{ backgroundColor: '#88F4B9', minHeight: 140 }}>
            <MaterialCommunityIcons name="heart" size={26} color="#028559" />
            <View className="mt-4">
              <Text className="text-[15px] font-bold text-[#028559] leading-tight mb-2">Novo Date</Text>
              <View className="bg-[#028559] self-start px-3 py-1.5 rounded-full">
                <Text className="text-white text-[10px] font-bold uppercase tracking-wider">Agendar</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className={`font-bold text-base ${textDark} mb-4 ml-1 tracking-tight`}>Atividade do Parceiro</Text>
          <VStack space="md">
            <ActivityItem
              icon="shopping"
              title='Kayke marcou "Comprar Pão" feito'
              time="Há 14 minutos"
              bgStyle={activityBg}
              iconBg={isDark ? '#44333A' : '#F1D0DC'}
              iconColor="#D7427C"
              textColor={textDark}
              subTextColor={textMutated}
            />
            <ActivityItem
              icon="airplane"
              title='Ana juntou R$100 para Viagem'
              time="Há 2 horas"
              bgStyle={activityBg}
              iconBg={isDark ? '#2D3748' : '#D1C4FC'}
              iconColor="#6B46C1"
              textColor={textDark}
              subTextColor={textMutated}
            />
          </VStack>
        </View>

      </ScrollView>
    </>
  );
}

function CheckInItem({
  id,
  icon,
  iconColor,
  label,
  selected = false,
  onPress,
}: {
  id: string;
  icon: string;
  iconColor: string;
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="items-center gap-1.5">
      <TouchableOpacity
        className="w-[50px] h-[50px] rounded-2xl items-center justify-center"
        style={[
          { backgroundColor: selected ? iconColor + '28' : isDark ? '#1E1E1E' : iconColor + '14' },
          selected ? { borderWidth: 2, borderColor: iconColor } : { borderWidth: 1.5, borderColor: 'transparent' },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name={icon as any} size={26} color={selected ? iconColor : isDark ? '#555' : '#9CA3AF'} />
      </TouchableOpacity>
      <Text
        className="text-[8px] font-bold tracking-wider"
        style={{ color: selected ? iconColor : isDark ? '#555' : '#94A3B8' }}
      >
        {label}
      </Text>
    </View>
  );
}

function ActivityItem({ icon, title, time, bgStyle, iconBg, iconColor, textColor, subTextColor }: any) {
  return (
    <View className={`flex-row items-center py-3.5 px-4 rounded-[28px] ${bgStyle}`}>
      <View className={`w-10 h-10 rounded-full items-center justify-center mr-3`} style={{ backgroundColor: iconBg }}>
        <MaterialCommunityIcons name={icon} size={18} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className={`text-sm font-bold ${textColor}`}>{title}</Text>
        <Text className={`text-[11px] italic font-medium mt-0.5 ${subTextColor}`}>{time}</Text>
      </View>
    </View>
  );
}

function lightenColor(hex: string, amount: number): string {
  if (!hex || typeof hex !== 'string') return '#FFFFFF';
  return adjustColor(hex, amount);
}

function adjustColor(hex: string, amount: number): string {
  if (!hex || typeof hex !== 'string') return '#000000';
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
