import React from "react";
import { Text } from "react-native";
import { Alert, HStack, VStack } from "native-base";

const SuccessToast = ({ message }) => {
  return (
    <>
      <Alert variant="left-accent" status="success">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text color="coolGray.800">{message}</Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    </>
  );
};

export default SuccessToast;
