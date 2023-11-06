import React, { useState } from "react";
import { Modal } from "native-base";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { imgPlaceholder } from "../../../assets";
import { styleSheet } from "./imagePreviewStyle";

const ImagePreview = ({ imageBefore, imageAfter }) => {
  const styles = styleSheet();

  const [showDetailImage, setShowDetailImage] = useState(false);
  const [imageType, setImageType] = useState("");

  const handleOpenModal = (type) => {
    setImageType(type);
    setShowDetailImage(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text>Before</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleOpenModal("Before")}
          >
            <Image
              source={
                imageBefore
                  ? {
                      uri: imageBefore,
                    }
                  : imgPlaceholder
              }
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Text>After</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleOpenModal("After")}
          >
            <Image
              source={
                imageAfter
                  ? {
                      uri: imageAfter,
                    }
                  : imgPlaceholder
              }
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        </View>

        <Modal
          isOpen={showDetailImage}
          onClose={() => setShowDetailImage(false)}
        >
          <Modal.Content width={"95%"}>
            <Modal.CloseButton />
            <Modal.Header>{`Image ${imageType}`}</Modal.Header>
            <Modal.Body style={styles.modalBodyStyle}>
              {imageType === "Before" ? (
                <Image
                  source={
                    imageBefore
                      ? {
                          uri: imageBefore,
                        }
                      : imgPlaceholder
                  }
                  style={styles.imageDetailStyle}
                />
              ) : (
                <Image
                  source={
                    imageAfter
                      ? {
                          uri: imageAfter,
                        }
                      : imgPlaceholder
                  }
                  style={styles.imageDetailStyle}
                />
              )}
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </View>
    </>
  );
};

export default ImagePreview;
