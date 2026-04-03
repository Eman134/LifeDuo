import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

export function SettingsItem({ icon, label, rightText, onPress }: { icon: any; label: string; rightText?: string; onPress?: () => void }) {
  const { colorScheme } = useNativeWindColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#A08B93' : '#CB7392';
  return (
    <TouchableOpacity className="flex-row items-center justify-between p-4" onPress={onPress}>
      <HStack space="md" className="items-center">
        <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        <Text className="text-typography-800 text-base font-medium">{label}</Text>
      </HStack>
      <HStack className="items-center" space="sm">
        {rightText && <Text className="text-typography-400 text-sm">{rightText}</Text>}
        <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" />
      </HStack>
    </TouchableOpacity>
  );
}
