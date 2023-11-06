import React, { useEffect, useState } from "react";
import { withFatigueHeader } from "../../layouts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAccessToken, useMainLayout } from "../../contexts";
import { styleSheet } from "./style";
import { ScrollView, Text, View } from "react-native";
import {
  FormControlDatePicker,
  FormControlInput,
  Paper,
} from "../../components";
import { Button, Modal } from "native-base";
import moment from "moment";
import { useAxios } from "../../hooks";
import { fatigueService } from "../../services";
import { useJwt } from "react-jwt";

const Fatigue = () => {
  const styles = styleSheet();
  const { accessToken } = useAccessToken();
  const { decodedToken } = useJwt(accessToken || "");
  const { setLayoutTitle } = useMainLayout();
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const submitFatigue = useAxios();

  const [totalSleep12, setTotalSleep12] = useState(null);
  const [totalSleep12Yesterday, setTotalSleep12Yesterday] = useState(null);
  const [awakeTime, setAawakeTime] = useState(moment().toDate());
  const [showInfo, setShowInfo] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const handleShowModal = () => {
    const payload = {
      totalSleep12:
        totalSleep12 !== null
          ? parseFloat(totalSleep12.split(",").join("."))
          : null,
      totalSleep12Yesterday:
        totalSleep12Yesterday !== null
          ? parseFloat(totalSleep12Yesterday.split(",").join("."))
          : null,
      awakeTime: moment(awakeTime).toDate(),
    };
    for (key in payload) {
      if (payload[key] === null) return;
    }
    setShowSubmitModal(true);
  };

  const handleSubmit = () => {
    const queryParams = { id };
    const payload = {
      totalSleep12:
        totalSleep12 !== null
          ? parseFloat(totalSleep12.split(",").join("."))
          : null,
      totalSleep12Yesterday:
        totalSleep12Yesterday !== null
          ? parseFloat(totalSleep12Yesterday.split(",").join("."))
          : null,
      awakeTime: moment(awakeTime).toDate(),
    };
    for (key in payload) {
      if (payload[key] === null) return;
    }
    submitFatigue.axiosFetch(fatigueService.submitData(queryParams, payload));
  };

  const convertHourPredict = (hourFloat) => {
    const hours = Math.floor(hourFloat);
    const minutes = Math.round((hourFloat - hours) * 60);
    return moment({ hour: hours, minute: minutes }).format("HH:mm");
  };

  const handleDone = () => {
    navigation.navigate("Home");
  };

  const handleOk = () => {
    setShowInfo(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLayoutTitle("");
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (submitFatigue.isSuccess) {
      setShowSubmitModal(false);
    }
  }, [submitFatigue.isSuccess]);

  return (
    <>
      <View style={styles.screenContainer}>
        <ScrollView style={styles.scrollContainer}>
          {showInfo ? (
            <Paper title="Fatigue" style={styles.paperStyle}>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  Mohon untuk mengisi terlebih dahulu Form Fatigue pada hari
                  ini.
                </Text>
                <Text style={styles.infoText}>
                  Form ini merupakan salah satu bentuk pencegahan terjadinya
                  kecelakaan kerja di lingkungan PT Acset Indonusa Tbk.
                </Text>
                <Text style={styles.infoText}>
                  Form ini wajib diisi oleh seluruh karyawan ACSET Group
                  sebeleum menggunakan aplikasi SHE Mobile.
                </Text>
              </View>

              <Button
                style={styles.buttonStyle}
                onPress={handleOk}
                colorScheme="green"
              >
                Ok
              </Button>
            </Paper>
          ) : (
            <>
              {submitFatigue.isSuccess ? (
                <Paper style={styles.paperStyle}>
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultName}>
                      {decodedToken.fullName}
                    </Text>

                    <Text style={styles.resultGreeting}>
                      Terimakasih telah mengisi Form Fatigue dengan jujur.
                      Kesimpulan dan rekomendasi berdasarkan jawaban Anda
                      adalah:
                    </Text>

                    <View
                      style={{
                        ...styles.result,
                        backgroundColor:
                          submitFatigue.response.payload.FatigueStatusBefore
                            .color,
                      }}
                    >
                      <Text style={styles.resultTitle}>
                        {
                          submitFatigue.response.payload.FatigueStatusBefore
                            .name
                        }
                      </Text>
                      <Text style={styles.resultDesc}>
                        JAM PREDIKSI FATIGUE PUKUL{" "}
                        {convertHourPredict(
                          submitFatigue.response.payload.fatiguePredict
                        )}
                      </Text>
                    </View>

                    <Text style={styles.resultDate}>
                      {moment().format("DD MMMM YYYY")}
                    </Text>
                    <Text style={styles.resultTime}>
                      {moment().format("HH:mm:ss")}
                    </Text>
                  </View>

                  <Button style={styles.buttonStyle} onPress={handleDone}>
                    Done
                  </Button>
                </Paper>
              ) : (
                <Paper style={styles.paperStyle} title="Fatigue Form">
                  <FormControlInput
                    isRequired
                    isInvalid={!totalSleep12}
                    label="Durasi Anda tidur semalam? (12 jam yang lalu)"
                    type="text"
                    returnKeyType="next"
                    inputMode="decimal"
                    defaultValue={totalSleep12}
                    onChangeText={(value) => setTotalSleep12(value)}
                    errorMessage={"Wajib diisi!"}
                    isDisabled={submitFatigue.loading}
                  />

                  <FormControlInput
                    isRequired
                    isInvalid={!totalSleep12Yesterday}
                    label="Durasi Anda tidur kemarin malam? (36 jam yang lalu)"
                    type="text"
                    returnKeyType="next"
                    inputMode="decimal"
                    defaultValue={totalSleep12Yesterday}
                    onChangeText={(value) => setTotalSleep12Yesterday(value)}
                    errorMessage={"Wajib diisi!"}
                    isDisabled={submitFatigue.loading}
                  />

                  <FormControlDatePicker
                    isRequired
                    label="Jam berapa Anda bangun hari ini?"
                    value={awakeTime}
                    mode="time"
                    onChange={(value) => setAawakeTime(value)}
                    isDisabled={submitFatigue.loading}
                  />

                  <Button
                    style={styles.buttonStyle}
                    isLoading={submitFatigue.loading}
                    isLoadingText="Submit"
                    onPress={handleShowModal}
                  >
                    Submit
                  </Button>
                </Paper>
              )}
            </>
          )}

          <View style={styles.emptySpace}></View>
        </ScrollView>
      </View>

      <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)}>
        <Modal.Content width={"95%"}>
          <Modal.CloseButton />
          <Modal.Header>Fatigue Form Confirmation</Modal.Header>
          <Modal.Body style={styles.modalBodyContainer}>
            <Text style={styles.modalText}>
              Saya menyatakan bahwa pernyataan yang telah saya isi di Form
              Fatigue adalah benar, akurat, dan lengkap.
            </Text>
          </Modal.Body>
          <Modal.Footer style={{ gap: 10 }}>
            <Button
              style={styles.modalButton}
              isLoading={submitFatigue.loading}
              isLoadingText="Ok"
              onPress={handleSubmit}
              colorScheme="green"
            >
              Ok
            </Button>

            <Button
              style={styles.modalButton}
              disabled={submitFatigue.loading}
              onPress={() => setShowSubmitModal(false)}
              colorScheme="danger"
              variant="outline"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

const FatigueScreen = withFatigueHeader(Fatigue);
export default FatigueScreen;
