import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Actionsheet, Button, Modal } from "native-base";
import { Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { imgPlaceholder } from "../../../assets";
import { styleSheet } from "./imageUploaderStyle";

const ImageUploader = ({ image, setImage, fetchLoading }) => {
  const styles = styleSheet();

  const [actionOpen, setActionOpen] = useState(false);
  const [showDetailImage, setShowDetailImage] = useState(false);

  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.2, // Image quality (0 to 1)
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const takePhotoWithCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.2, // Image quality (0 to 1)
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const onOpen = () => {
    setActionOpen(true);
  };

  const onClose = () => {
    setActionOpen(false);
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to take photos.");
      }
    })();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setShowDetailImage(true)}
        >
          <Image
            source={
              image
                ? {
                    uri: image.uri,
                  }
                : imgPlaceholder
            }
            style={styles.imageStyle}
          />
        </TouchableOpacity>

        <Button
          style={{ width: 100 }}
          onPress={onOpen}
          isLoading={fetchLoading}
        >
          Upload
        </Button>

        <Actionsheet isOpen={actionOpen} onClose={onClose} size="full">
          <Actionsheet.Content>
            <Actionsheet.Item
              startIcon={<Ionicons name="camera-outline" size={22} />}
              onPress={() => {
                takePhotoWithCamera();
                onClose();
              }}
            >
              Camera
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={<Ionicons name="image-outline" size={22} />}
              onPress={() => {
                pickImageFromLibrary();
                onClose();
              }}
            >
              Photo Galery
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>

        <Modal
          isOpen={showDetailImage}
          onClose={() => setShowDetailImage(false)}
        >
          <Modal.Content width={"95%"}>
            <Modal.CloseButton />
            <Modal.Header>Image</Modal.Header>
            <Modal.Body style={styles.modalBodyStyle}>
              <Image
                source={
                  image
                    ? {
                        uri: image.uri,
                      }
                    : imgPlaceholder
                }
                style={styles.imageDetailStyle}
              />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </View>
    </>
  );
};

export default ImageUploader;
