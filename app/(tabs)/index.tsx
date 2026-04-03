import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import React from 'react';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background-0" contentContainerStyle={{ flexGrow: 1 }}>
      <Box className="flex-1 px-4 py-8">
        <Center className="mb-8 mt-12">
          <Heading size="3xl" className="text-primary-500 mb-2">
            LifeDuo
          </Heading>
          <Text className="text-typography-500 text-center text-lg">
            Gluestack-UI v3 & NativeWind v4 beautifully integrated!
          </Text>
        </Center>

        <VStack space="xl" className="flex-1">
          <Card className="p-5 border border-outline-200 rounded-xl bg-background-50 shadow-sm">
            <Heading size="md" className="mb-2">
              Getting Started
            </Heading>
            <Text className="text-typography-600 mb-4">
              Edit the <Text className="font-bold">app/(tabs)/index.tsx</Text> file to see the changes update in real time.
            </Text>
            <HStack space="md" className="items-center">
              <Button size="md" action="primary" variant="solid" className="flex-1 rounded-full">
                <ButtonText>Explore Features</ButtonText>
              </Button>
              <Button size="md" action="secondary" variant="outline" className="flex-1 rounded-full">
                <ButtonText>Documentation</ButtonText>
              </Button>
            </HStack>
          </Card>

          <Card className="p-5 border border-outline-200 rounded-xl bg-background-50 shadow-sm">
            <VStack space="sm">
              <Heading size="md">Modern Ecosystem</Heading>
              <Text className="text-typography-600">
                You are utilizing Expo v52+, React Native v0.76+, Gluestack UI v3, and NativeWind v4 out of the box. Building beautiful apps has never been easier.
              </Text>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </ScrollView>
  );
}
