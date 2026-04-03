import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';

export function CustomHeader() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const startDate = new Date('2025-05-17T00:00:00');
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const daysString = diffDays >= 0 ? `${diffDays} dias` : `Faltam ${Math.abs(diffDays)} dias`;

  const bgColor = isDark ? '#1A1A1A' : '#FEF4F7';
  const textColor = isDark ? '#FFFFFF' : '#333333';
  const iconColor = isDark ? '#A08B93' : '#DD4B85';
  const badgeBg = isDark ? '#2D2D2D' : '#FFFFFF';

  return (
    <View
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: bgColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#DD4B85',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        borderBottomWidth: isDark ? 1 : 0,
        borderBottomColor: '#333',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=A+K&background=DD4B85&color=fff&rounded=true' }}
            style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#DD4B85' }}
          />
          <View style={{ position: 'absolute', bottom: -2, right: -2, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 2 }}>
            <MaterialCommunityIcons name="heart" size={12} color="#DD4B85" />
          </View>
        </View>

        <View style={{ marginLeft: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: textColor, letterSpacing: -0.2 }}>
            Ana + Kayke
          </Text>
          <Text style={{ fontSize: 11, color: iconColor, fontWeight: '500' }}>
            {`Juntos desde 17/05/2025`}
            {`\n${daysString}`}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>

        {/* Streak */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: badgeBg,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 15
          }}
        >
          <FontAwesome5 name="fire" size={12} color="#FF9500" />
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: textColor, marginLeft: 4 }}>12</Text>
        </TouchableOpacity>

        {/* Credits */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: badgeBg,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 15
          }}
        >
          <MaterialCommunityIcons name="star-four-points" size={14} color="#FFD700" />
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: textColor, marginLeft: 4 }}>450</Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity style={{ padding: 4 }}>
          <MaterialCommunityIcons name="bell-outline" size={24} color={textColor} />
          {/* Unread notifications dot */}
          <View style={{ position: 'absolute', top: 4, right: 6, width: 8, height: 8, backgroundColor: '#DD4B85', borderRadius: 4, borderWidth: 1, borderColor: bgColor }} />
        </TouchableOpacity>

      </View>
    </View>
  );
}
