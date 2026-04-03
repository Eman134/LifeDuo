import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function ProfileScreen() {
  const isDark = useColorScheme() === 'dark';
  const cardBg = isDark ? 'bg-[#1E1E1E]' : 'bg-background-0';
  const borderColor = isDark ? 'border-[#333333]' : 'border-outline-200';

  return (
    <ScrollView className="flex-1 bg-background-50 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Profile */}
      <View className="items-center mb-8 mt-4">
        <Image
          source={{ uri: 'https://ui-avatars.com/api/?name=Kayke&background=DD4B85&color=fff&rounded=true' }}
          className="w-24 h-24 rounded-full mb-4 border-4 border-[#FEF4F7]"
        />
        <Heading size="xl">Kayke</Heading>
        <Text className="text-typography-500 mt-1">@kayke.duo</Text>
      </View>

      <VStack space="xl">
        {/* Account Section */}
        <View>
          <Text className="text-sm font-bold text-typography-500 ml-2 mb-2 uppercase">Conta</Text>
          <View className={`rounded-2xl ${cardBg} border ${borderColor} overflow-hidden`}>
            <SettingsItem icon="account-edit" label="Editar Perfil" />
            <View className={`h-[1px] ${isDark ? 'bg-[#333]' : 'bg-outline-200'} ml-12`} />
            <SettingsItem icon="heart-multiple" label="Configurações do Casal" />
            <View className={`h-[1px] ${isDark ? 'bg-[#333]' : 'bg-outline-200'} ml-12`} />
            <SettingsItem icon="shield-account" label="Privacidade" />
          </View>
        </View>

        {/* General Section */}
        <View>
          <Text className="text-sm font-bold text-typography-500 ml-2 mb-2 uppercase">Geral</Text>
          <View className={`rounded-2xl ${cardBg} border ${borderColor} overflow-hidden`}>
            <SettingsItem icon="bell-ring" label="Notificações" />
            <View className={`h-[1px] ${isDark ? 'bg-[#333]' : 'bg-outline-200'} ml-12`} />
            <SettingsItem icon="theme-light-dark" label="Aparência" />
            <View className={`h-[1px] ${isDark ? 'bg-[#333]' : 'bg-outline-200'} ml-12`} />
            <SettingsItem icon="translate" label="Idioma" />
          </View>
        </View>

        {/* Actions Section */}
        <View className="mt-4 mb-6">
          <View className={`rounded-2xl ${cardBg} border ${borderColor} overflow-hidden`}>
            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <HStack space="md" className="items-center">
                <MaterialCommunityIcons name="logout" size={24} color="#ef4444" />
                <Text className="text-error-500 font-semibold text-base">Sair da Conta</Text>
              </HStack>
            </TouchableOpacity>
          </View>
        </View>
      </VStack>
    </ScrollView>
  );
}

function SettingsItem({ icon, label }: { icon: any; label: string }) {
  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? '#A08B93' : '#CB7392';
  return (
    <TouchableOpacity className="flex-row items-center justify-between p-4">
      <HStack space="md" className="items-center">
        <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        <Text className="text-typography-800 text-base font-medium">{label}</Text>
      </HStack>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" />
    </TouchableOpacity>
  );
}
