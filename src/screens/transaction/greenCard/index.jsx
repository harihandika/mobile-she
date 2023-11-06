import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useToast } from "native-base";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useMainLayout } from "../../../contexts";
import { ErrorToast, Paper } from "../../../components";
import { useAxios } from "../../../hooks";
import { greenCardService } from "../../../services";
import ImageUploader from "./ImageUploader";
import GreenCardForm from "./GreenCardForm";
import { styleSheet } from "./style";

const GreenCardScreen = () => {
  const styles = styleSheet();
  const { setLayoutTitle } = useMainLayout();
  const navigation = useNavigation();
  const toast = useToast();
  const uploadImage = useAxios();
  const createGreenCard = useAxios(true);

  const [image, setImage] = useState(null);
  const [formValue, setFormValue] = useState({});
  const [fetchLoading, setFetchLoading] = useState(false);

  const onSubmit = (values) => {
    if (image === null) {
      toast.show({
        placement: "top",
        render: () => <ErrorToast message="Gambar tidak boleh kosong!" />,
      });
      return;
    }

    setFormValue(values);

    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      type: "image/jpeg",
      name: image.fileName ? image.fileName : image.uri.split("/").pop(),
    });

    uploadImage.axiosFetch(greenCardService.uploadImage(formData));
  };

  const postGreenCard = (imagePath) => {
    const payload = {
      projectId: formValue.projectId,
      areaId: formValue.areaId,
      hazardCategoryId: formValue.hazardCategoryId,
      findingId: formValue.findingId,
      hazardDescription: formValue.hazardDescription,
      suggestion: formValue.suggestion,
      hazardDate: moment(formValue.hazardDate)
        .add(moment(formValue.hazardTime).format("HH:mm:ss"), "HH:mm:ss")
        .toDate(),
      hazardLocation: formValue.hazardLocation,
      beforeImagePath: imagePath,
    };
    createGreenCard.axiosFetch(greenCardService.createData(payload));
    setFormValue({});
    setImage(null);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLayoutTitle("Create Green Card");
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (uploadImage.isSuccess) {
      postGreenCard(uploadImage.response.payload.filePath);
    }
  }, [uploadImage.isSuccess]);

  useEffect(() => {
    if (uploadImage.loading || createGreenCard.loading) {
      setFetchLoading(true);
    } else {
      setFetchLoading(false);
    }
  }, [uploadImage.loading, createGreenCard.loading]);

  return (
    <>
      <View style={styles.screenContainer}>
        <ScrollView style={styles.scrollContainer}>
          <Paper style={styles.paperStyle}>
            <ImageUploader
              image={image}
              setImage={setImage}
              fetchLoading={fetchLoading}
            />

            <GreenCardForm
              onSubmit={onSubmit}
              fetchLoading={fetchLoading}
              createGreenCard={createGreenCard}
            />
          </Paper>

          <View style={styles.emptySpace}></View>
        </ScrollView>
      </View>
    </>
  );
};

export default GreenCardScreen;
