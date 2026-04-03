import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

import { useColorScheme } from 'nativewind';

const ACTIVE_BG_COLOR = '#E26D92';
const ACTIVE_TEXT_COLOR = '#FFFFFF';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const tabBarColor = isDark ? '#1E1E1E' : '#FEF4F7';
  const inactiveTextColor = isDark ? '#A08B93' : '#CB7392';
  const shadowColor = isDark ? '#000000' : '#E26D92';

  return (
    <View style={[styles.container, { backgroundColor: tabBarColor, shadowColor }]}>
      <View style={styles.contentContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          let label = options.title !== undefined ? options.title : route.name;
          if (route.name === 'index') label = 'INÍCIO';
          else if (route.name === 'connect') label = 'CONEXÃO';
          else if (route.name === 'tasks') label = 'TAREFAS';
          else if (route.name === 'places') label = 'LUGARES';
          else if (route.name === 'gifts') label = 'MIMOS';
          else if (route.name === 'more') label = 'PERFIL';

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabBarItem
              key={route.key}
              routeName={route.name}
              label={label as string}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              inactiveTextColor={inactiveTextColor}
            />
          );
        })}
      </View>
    </View>
  );
}

function TabBarItem({ routeName, label, isFocused, onPress, onLongPress, inactiveTextColor }: any) {
  const animatedValue = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    animatedValue.value = withSpring(isFocused ? 1 : 0, {
      damping: 20,
      stiffness: 100,
      mass: 0.8,
    });
  }, [isFocused]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        ['rgba(226, 109, 146, 0)', ACTIVE_BG_COLOR]
      ),
      transform: [
        { scale: 1 + 0.1 * animatedValue.value }
      ]
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animatedValue.value,
        [0, 1],
        [inactiveTextColor, ACTIVE_TEXT_COLOR]
      ),
    };
  });

  const getIcon = (color: string) => {
    switch (routeName) {
      case 'index':
        return <MaterialCommunityIcons name="paw" size={24} color={color} />;
      case 'connect':
        return <MaterialCommunityIcons name="heart" size={24} color={color} />;
      case 'tasks':
        return <Feather name="check-circle" size={24} color={color} />;
      case 'places':
        return <MaterialCommunityIcons name="map-marker" size={24} color={color} />;
      case 'gifts':
        return <MaterialCommunityIcons name="gift" size={24} color={color} />;
      case 'more':
        return (
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=Kayke&background=DD4B85&color=fff&rounded=true' }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 1.5,
              borderColor: color
            }}
          />
        );
      default:
        return <MaterialCommunityIcons name="circle" size={24} color={color} />;
    }
  };

  const AnimatedIcon = () => {
    const animatedIconProps = useAnimatedStyle(() => {
      return {
        opacity: 1
      };
    });
    return (
      <Animated.View style={animatedIconProps}>
        {getIcon(isFocused ? ACTIVE_TEXT_COLOR : inactiveTextColor)}
      </Animated.View>
    );
  };

  return (
    <TouchableOpacity
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabButton}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.tabContent, animatedContainerStyle]}>
        <AnimatedIcon />
        <Animated.Text
          style={[styles.tabLabel, animatedTextStyle]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 40,
    height: 70,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flex: 1,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
    width: '100%',
  },
});
