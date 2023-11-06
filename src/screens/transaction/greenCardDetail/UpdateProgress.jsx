import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { imgPlaceholder } from "../../../assets";
import * as ImagePicker from "expo-image-picker";
import { styleSheet } from "./updateProgressStyle";
import { Actionsheet, Button, Modal, Slider } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { FormControlInput } from "../../../components";

const UpdateProgress = (props) => {
  const {
    image,
    setImage,
    progressNote,
    setProgressNote,
    progressValue,
    updateModalOpen,
    handleUpdateProgress,
    isLoading,
  } = props;
  const styles = styleSheet();

  const [actionOpen, setActionOpen] = useState(false);
  const [showDetailImage, setShowDetailImage] = useState(false);
  const [progress, setProgress] = useState(progressValue);

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

  useEffect(() => {
    setProgress(progressValue);
  }, [updateModalOpen]);

  return (
    <>
      <View style={styles.container}>
        <Text>Progress Image</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={onOpen}>
          <Image
            source={
              image
                ? image.uri
                  ? {
                      uri: image.uri,
                    }
                  : imgPlaceholder
                : imgPlaceholder
            }
            style={styles.imageStyle}
          />
        </TouchableOpacity>

        <FormControlInput
          label="Progress Note"
          type="text"
          value={progressNote}
          onChangeText={(value) => setProgressNote(value)}
          isDisabled={isLoading}
        />

        <Text style={{ marginBottom: -7, marginTop: 7 }}></Text>

        <FormControlInput
          label={`Progress: ${progress}%`}
          type="text"
          returnKeyType="done"
          inputMode="decimal"
          defaultValue={progress}
          onChangeText={(value) => setProgress(Math.floor(value))}
          isDisabled={isLoading}
        />

        {progress === 100 ? (
          <Button
            style={styles.buttonStyle}
            colorScheme="green"
            onPress={() => handleUpdateProgress(progress)}
            isLoading={isLoading}
            isLoadingText="Resolve"
          >
            Resolve
          </Button>
        ) : (
          <Button
            style={styles.buttonStyle}
            onPress={() => handleUpdateProgress(progress)}
            isLoading={isLoading}
            isLoadingText="Update"
          >
            Update
          </Button>
        )}

        <Actionsheet isOpen={actionOpen} onClose={onClose} size="full">
          <Actionsheet.Content>
            <Actionsheet.Item
              startIcon={<Ionicons name="eye-outline" size={22} />}
              onPress={() => {
                setShowDetailImage(true);
                onClose();
              }}
            >
              Preview
            </Actionsheet.Item>
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
                    ? image.uri
                      ? {
                          uri: image.uri,
                        }
                      : imgPlaceholder
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

export default UpdateProgress;
