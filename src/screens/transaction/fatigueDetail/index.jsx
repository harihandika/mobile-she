import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Modal } from "native-base";
import moment from "moment";
import { useJwt } from "react-jwt";
import { useNavigation } from "@react-navigation/native";
import { withTransactionHeader } from "../../../layouts";
import { useAccessToken, useMainLayout } from "../../../contexts";
import { FormControlInput, Paper } from "../../../components";
import { useAxios } from "../../../hooks";
import { fatigueService } from "../../../services";
import { styleSheet } from "./style";

const FatigueDetail = ({ route }) => {
  const { id, selfData } = route.params;
  const styles = styleSheet();
  const { setLayoutTitle } = useMainLayout();
  const { accessToken } = useAccessToken();
  const { decodedToken } = useJwt(accessToken || "");
  const navigation = useNavigation();
  const getApprovalDetail = useAxios();
  const approval = useAxios();

  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [noteValue, setNoteValue] = useState(null);

  const handleApproval = (statusCode, noteRequired) => {
    if (noteRequired) if (noteValue === null || noteValue === "") return;
    const queryParams = { id, fatigueStatusBeforeCode: statusCode };
    const payload = { note: noteValue };
    approval.axiosFetch(fatigueService.approval(queryParams, payload));
  };

  const getApprovalDetailData = (id) => {
    const queryParams = { id };
    getApprovalDetail.axiosFetch(fatigueService.getApprovalDetail(queryParams));
  };

  const handleModalApprovalOpen = () => {
    setApprovalModalOpen(true);
  };

  const handleModalApprovalClose = () => {
    setApprovalModalOpen(false);
  };

  const generateFeedbackStatus = (code) => {
    if (code === "KN") {
      return "success";
    } else if (code === "DPK") {
      return "warning";
    } else if (code === "TBB") {
      return "error";
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLayoutTitle("Fatigue Detail");
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getApprovalDetailData(id);
  }, [id]);

  useEffect(() => {
    if (approval.isSuccess) {
      navigation.goBack();
    }
  }, [approval.isSuccess]);

  return (
    <>
      <View style={styles.screenContainer}>
        <ScrollView style={styles.scrollContainer}>
          <Paper style={styles.paperStyle}>
            <FormControlInput
              label="NRP"
              type="text"
              defaultValue={getApprovalDetail.response.payload?.User?.nrp}
              isDisabled={true}
              isLoading={getApprovalDetail.loading}
            />
            <FormControlInput
              label="Nama"
              type="text"
              defaultValue={getApprovalDetail.response.payload?.User?.fullName}
              isDisabled={true}
              isLoading={getApprovalDetail.loading}
            />
            <FormControlInput
              label="Lokasi Kerja"
              type="text"
              defaultValue={
                getApprovalDetail.response.payload?.User?.Projects[0]?.name
              }
              isDisabled={true}
              isLoading={getApprovalDetail.loading}
            />
            <FormControlInput
              label="Durasi tidur semalam (12 jam yang lalu)"
              type="text"
              defaultValue={
                getApprovalDetail.response.payload?.totalSleep12.toString() +
                " jam"
              }
              isDisabled={true}
              isLoading={getApprovalDetail.loading}
            />
            <FormControlInput
              label="Durasi tidur kemarin malam (36 jam yang lalu)"
              type="text"
              defaultValue={
                getApprovalDetail.response.payload?.totalSleep36.toString() +
                " jam"
              }
              isDisabled={true}
              isLoading={getApprovalDetail.loading}
            />
            <FormControlInput
              label="Waktu bangun tidur hari ini"
              type="text"
              defaultValue={moment(
                getApprovalDetail.response.payload?.awakeTime
              ).format("YYYY-MM-DD HH:mm:ss")}
              isDisabled={true}
              isLoading={getApprovalDetail.loading}
            />
            <FormControlInput
              label="Status"
              type="text"
              defaultValue={
                getApprovalDetail.response.payload?.FatigueStatusBefore?.name
              }
              isDisabled={true}
              isLoading={getApprovalDetail.loading}
              hasFeedback
              feedbackStatus={generateFeedbackStatus(
                getApprovalDetail.response.payload?.FatigueStatusBefore?.code
              )}
            />
            <FormControlInput
              label="Status Rekomendasi"
              type="text"
              defaultValue={
                getApprovalDetail.response.payload?.FatigueStatusAfter?.name
              }
              isDisabled={true}
              isLoading={getApprovalDetail.loading}
              hasFeedback
              feedbackStatus={generateFeedbackStatus(
                getApprovalDetail.response.payload?.FatigueStatusAfter?.code
              )}
            />
            <FormControlInput
              label="Note"
              type="text"
              defaultValue={
                getApprovalDetail.response.payload?.superiorApprovalNote
              }
              isDisabled={true}
              isLoading={getApprovalDetail.loading}
            />

            {!selfData && (
              <>
                {getApprovalDetail.isSuccess &&
                  getApprovalDetail.response.payload?.FatigueStatusAfter ===
                    null && (
                    <>
                      {decodedToken?.Role?.name === "SHE System" ||
                      decodedToken?.Role?.name === "PM" ? (
                        <Button
                          style={styles.buttonStyle}
                          colorScheme="green"
                          onPress={() =>
                            handleApproval(
                              getApprovalDetail.response.payload
                                ?.FatigueStatusBefore?.code,
                              false
                            )
                          }
                        >
                          Approve
                        </Button>
                      ) : (
                        <Button
                          style={styles.buttonStyle}
                          onPress={handleModalApprovalOpen}
                        >
                          Approval
                        </Button>
                      )}
                    </>
                  )}
              </>
            )}
          </Paper>

          <View style={styles.emptySpace}></View>
        </ScrollView>
      </View>

      <Modal isOpen={approvalModalOpen} onClose={handleModalApprovalClose}>
        <Modal.Content width={"95%"}>
          <Modal.CloseButton />
          <Modal.Header>Fatigue Approval</Modal.Header>
          <Modal.Body style={styles.modalBodyStyle}>
            <FormControlInput
              isRequired
              label="Note"
              type="text"
              value={noteValue}
              onChangeText={(value) => setNoteValue(value)}
              isDisabled={approval.loading}
            />

            <Button
              style={styles.buttonStyle}
              colorScheme="green"
              onPress={() =>
                handleApproval(
                  getApprovalDetail.response.payload?.FatigueStatusBefore?.code,
                  true
                )
              }
            >
              Approve
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

const FatigueDetailScreen = withTransactionHeader(FatigueDetail);
export default FatigueDetailScreen;
