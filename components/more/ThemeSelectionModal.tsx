import React from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

interface ThemeSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  themeMode: 'light' | 'dark' | 'system';
  onSelectTheme: (mode: 'light' | 'dark' | 'system') => void;
}

export function ThemeSelectionModal({ visible, onClose, themeMode, onSelectTheme }: ThemeSelectionModalProps) {
  const { colorScheme } = useNativeWindColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = isDark ? 'bg-[#1E1E1E]' : 'bg-background-0';
  const borderColor = isDark ? 'border-[#333333]' : 'border-outline-200';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View className={`w-4/5 rounded-3xl ${cardBg} p-6 border ${borderColor} shadow-lg`} onStartShouldSetResponder={() => true}>
          <Heading size="md" className="mb-4 text-center">Aparência do App</Heading>
          
          <ThemeOption label="Claro" isSelected={themeMode === 'light'} onPress={() => onSelectTheme('light')} />
          <ThemeOption label="Escuro" isSelected={themeMode === 'dark'} onPress={() => onSelectTheme('dark')} />
          <ThemeOption label="Padrão do Dispositivo" isSelected={themeMode === 'system'} onPress={() => onSelectTheme('system')} isLast />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function ThemeOption({ label, isSelected, onPress, isLast }: { label: string; isSelected: boolean; onPress: () => void; isLast?: boolean }) {
  const { colorScheme } = useNativeWindColorScheme();
  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#333333';

  return (
    <TouchableOpacity onPress={onPress} className={`flex-row items-center justify-between py-4 ${!isLast ? 'border-b border-[#E5E5E5] dark:border-[#333333]' : ''}`}>
      <Text style={{ color: textColor, fontSize: 16, fontWeight: isSelected ? 'bold' : 'normal' }}>{label}</Text>
      {isSelected ? (
        <MaterialCommunityIcons name="check-circle" size={24} color="#DD4B85" />
      ) : (
        <MaterialCommunityIcons name="circle-outline" size={24} color={isDark ? '#555' : '#CCC'} />
      )}
    </TouchableOpacity>
  );
}
