import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { withTransactionHeader } from "../../../layouts";
import { useMainLayout } from "../../../contexts";
import { useAxios } from "../../../hooks";
import { greenCardService } from "../../../services";
import { styleSheet } from "./style";
import { ErrorToast, Paper } from "../../../components";
import ImagePreview from "./ImagePreview";
import GreenCardForm from "./GreenCardForm";
import { Button, Modal, useToast } from "native-base";
import UpdateProgress from "./UpdateProgress";

const GreenCardDetail = ({ route }) => {
  const { type, id } = route.params;
  const styles = styleSheet();
  const { setLayoutTitle } = useMainLayout();
  const toast = useToast();
  const getDetail = useAxios();
  const updatePicReceive = useAxios();
  const uploadImage = useAxios();
  const picUpdateProgress = useAxios(true);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [progressNote, setProgressNote] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  const getDetailData = () => {
    const queryParams = { id };
    getDetail.axiosFetch(greenCardService.getDetail(queryParams));
  };

  const handleUpdatePicReceive = () => {
    const queryParams = { id };
    updatePicReceive.axiosFetch(greenCardService.updatePicReceive(queryParams));
  };

  const handleModalUpdateOpen = () => {
    setUpdateModalOpen(true);
  };

  const handleModalUpdateClose = () => {
    setUpdateModalOpen(false);
    setImage({ uri: getDetail.response.payload.afterImagePath });
    setProgressNote(getDetail.response.payload.progressNote);
    setProgressValue(getDetail.response.payload.progressPercentage);
  };

  const handleUpdateProgress = (progressVal) => {
    if (image === null) {
      toast.show({
        placement: "top",
        render: () => <ErrorToast message="Image is required!" />,
      });
      return;
    } else if (image.uri === null) {
      toast.show({
        placement: "top",
        render: () => <ErrorToast message="Image is required!" />,
      });
      return;
    } else if (progressNote === "" || progressNote === null) {
      toast.show({
        placement: "top",
        render: () => <ErrorToast message="Note is required!" />,
      });
      return;
    }

    setProgressValue(progressVal);

    if (image.uri === getDetail.response.payload.afterImagePath) {
      const queryParams = { id };
      const payload = {
        afterImagePath: null,
        progressNote: progressNote,
        progressPercentage: progressVal,
      };
      picUpdateProgress.axiosFetch(
        greenCardService.picUpdateProgress(queryParams, payload)
      );
    } else {
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        type: "image/jpeg",
        name: image.fileName ? image.fileName : image.uri.split("/").pop(),
      });
      uploadImage.axiosFetch(greenCardService.uploadImage(formData));
    }
  };

  const updateProgressGreenCard = (imagePath) => {
    const queryParams = { id };
    const payload = {
      afterImagePath: imagePath,
      progressNote: progressNote,
      progressPercentage: progressValue,
    };
    picUpdateProgress.axiosFetch(
      greenCardService.picUpdateProgress(queryParams, payload)
    );
  };

  useEffect(() => {
    setLayoutTitle("Green Card Detail");
    getDetailData();
  }, [id]);

  useEffect(() => {
    if (getDetail.isSuccess) {
      if (
        getDetail.response.payload.GreenCardStatus.name === "Ditugaskan ke PIC"
      ) {
        handleUpdatePicReceive();
      }

      setImage({ uri: getDetail.response.payload.afterImagePath });
      setProgressNote(getDetail.response.payload.progressNote);
      setProgressValue(getDetail.response.payload.progressPercentage);
    }
  }, [getDetail.isSuccess]);

  useEffect(() => {
    if (updatePicReceive.isSuccess) {
      getDetailData();
    }
  }, [updatePicReceive.isSuccess]);

  useEffect(() => {
    if (uploadImage.isSuccess) {
      updateProgressGreenCard(uploadImage.response.payload.filePath);
    }
  }, [uploadImage.isSuccess]);

  useEffect(() => {
    if (picUpdateProgress.isSuccess) {
      getDetailData();
      setUpdateModalOpen(false);
    }
  }, [picUpdateProgress.isSuccess]);

  return (
    <>
      <View style={styles.screenContainer}>
        <ScrollView style={styles.scrollContainer}>
          <Paper style={styles.paperStyle}>
            <ImagePreview
              imageBefore={getDetail.response?.payload?.beforeImagePath}
              imageAfter={getDetail.response?.payload?.afterImagePath}
            />

            <GreenCardForm
              sourceData={getDetail.response?.payload}
              formLoading={getDetail.loading}
            />

            {getDetail.isSuccess && (
              <>
                {type === "Assignment" &&
                  getDetail.response.payload.GreenCardStatus.name ===
                    "Diterima PIC" && (
                    <Button
                      style={styles.buttonStyle}
                      onPress={handleModalUpdateOpen}
                    >
                      Update Progress
                    </Button>
                  )}
              </>
            )}
          </Paper>

          <View style={styles.emptySpace}></View>
        </ScrollView>
      </View>

      <Modal isOpen={updateModalOpen} onClose={handleModalUpdateClose}>
        <Modal.Content width={"95%"}>
          <Modal.CloseButton />
          <Modal.Header>Update Progress</Modal.Header>
          <Modal.Body style={styles.modalBodyStyle}>
            <UpdateProgress
              image={image}
              setImage={setImage}
              progressNote={progressNote}
              setProgressNote={setProgressNote}
              progressValue={progressValue}
              setProgressValue={setProgressValue}
              updateModalOpen={updateModalOpen}
              handleUpdateProgress={handleUpdateProgress}
              isLoading={uploadImage.loading || picUpdateProgress.loading}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

const GreenCardDetailScreen = withTransactionHeader(GreenCardDetail);
export default GreenCardDetailScreen;
