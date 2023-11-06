import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { styleSheet } from "./changePasswordStyle";
import { Formik } from "formik";
import { FormControlInput } from "../../../components";
import { Button } from "native-base";
import { hashPassword } from "../../../utils";
import { useAccessToken } from "../../../contexts";
import { useJwt } from "react-jwt";
import { useAxios } from "../../../hooks";
import { userService } from "../../../services";

const initFormData = {
  currentPassword: undefined,
  newPassword: undefined,
  confirmNewPassword: undefined,
};

const ChangePassword = () => {
  const styles = styleSheet();
  const { accessToken } = useAccessToken();
  const { decodedToken } = useJwt(accessToken || "");
  const changePassword = useAxios(true);

  const formikRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  const [formData] = useState(initFormData);
  const [newPassFeedbackStatus, setNewPassFeedbackStatus] = useState(undefined);
  const [confNewPassFeedbackStatus, setConfNewPassFeedbackStatus] =
    useState(undefined);
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);

  const handleValidate = (values) => {
    const errors = {};

    setNewPassFeedbackStatus("success");
    setConfNewPassFeedbackStatus("success");

    if (values.currentPassword === "")
      errors.currentPassword = "Password Saat Ini tidak boleh kosong!";

    if (values.confirmNewPassword === "") {
      setConfNewPassFeedbackStatus(undefined);
      errors.confirmNewPassword =
        "Konfirmasi Password Baru tidak boleh kosong!";
    }

    if (
      values.currentPassword === values.newPassword &&
      (values.currentPassword !== undefined || values.newPassword !== undefined)
    ) {
      errors.newPassword =
        "Password Baru tidak boleh sama dengan Password Saat Ini!";
      setNewPassFeedbackStatus("error");
    }
    if (values.newPassword !== undefined) {
      if (values.newPassword === "") {
        errors.newPassword = "Password Baru tidak boleh kosong!";
        setNewPassFeedbackStatus(undefined);
      } else if (values.newPassword.length < 8) {
        errors.newPassword = "Password Baru minimal 8 karakter!";
        setNewPassFeedbackStatus("error");
      }
    }
    if (values.confirmNewPassword !== undefined) {
      if (values.confirmNewPassword !== "") {
        if (values.newPassword !== values.confirmNewPassword) {
          errors.confirmNewPassword = "Password tidak cocok!";
          setConfNewPassFeedbackStatus("error");
        }
      }
    }
    if (values.newPassword === undefined) setNewPassFeedbackStatus(undefined);
    if (values.confirmNewPassword === undefined)
      setConfNewPassFeedbackStatus(undefined);

    return errors;
  };

  const onSubmit = (values) => {
    if (
      values.currentPassword === undefined ||
      values.newPassword === undefined ||
      values.confirmNewPassword === undefined
    ) {
      setIsErrorSubmit(true);
    } else {
      setIsErrorSubmit(false);
      const queryParams = { id: decodedToken.id };
      const payload = {
        currentPassword: hashPassword(values.currentPassword),
        newPassword: hashPassword(values.newPassword),
        confirmNewPassword: hashPassword(values.confirmNewPassword),
        encrypted: true,
      };
      changePassword.axiosFetch(
        userService.changePassword(queryParams, payload)
      );
    }
  };

  useEffect(() => {
    formikRef.current.setValues(formData);
  }, [formData]);

  useEffect(() => {
    if (changePassword.isSuccess) {
      formikRef.current.setValues(initFormData);
    }
  }, [changePassword.isSuccess]);

  return (
    <>
      <View style={styles.formContainer}>
        <Formik
          innerRef={formikRef}
          initialValues={formData}
          onSubmit={onSubmit}
          validate={handleValidate}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
            if (isErrorSubmit) {
              values.currentPassword =
                values.currentPassword === undefined
                  ? ""
                  : values.currentPassword;
              values.newPassword =
                values.newPassword === undefined ? "" : values.newPassword;
              values.confirmNewPassword =
                values.confirmNewPassword === undefined
                  ? ""
                  : values.confirmNewPassword;
            }

            return (
              <View style={styles.formContainer}>
                <FormControlInput
                  isRequired
                  isInvalid={"currentPassword" in errors}
                  label="Password Saat Ini"
                  type="password"
                  returnKeyType="next"
                  defaultValue={values.currentPassword}
                  onBlur={handleBlur("currentPassword")}
                  onChangeText={handleChange("currentPassword")}
                  errorMessage={errors.currentPassword}
                  isDisabled={changePassword.loading}
                  onSubmitEditing={() => newPasswordRef.current.focus()}
                />

                <FormControlInput
                  innerRef={newPasswordRef}
                  isRequired
                  isInvalid={"newPassword" in errors}
                  label="Password Baru"
                  type="password"
                  returnKeyType="next"
                  defaultValue={values.newPassword}
                  onBlur={handleBlur("newPassword")}
                  onChangeText={handleChange("newPassword")}
                  errorMessage={errors.newPassword}
                  hasFeedback
                  feedbackStatus={newPassFeedbackStatus}
                  isDisabled={changePassword.loading}
                  onSubmitEditing={() => confirmNewPasswordRef.current.focus()}
                />

                <FormControlInput
                  innerRef={confirmNewPasswordRef}
                  isRequired
                  isInvalid={"confirmNewPassword" in errors}
                  label="Konfirmasi Password Baru"
                  type="password"
                  returnKeyType="done"
                  defaultValue={values.confirmNewPassword}
                  onBlur={handleBlur("confirmNewPassword")}
                  onChangeText={handleChange("confirmNewPassword")}
                  errorMessage={errors.confirmNewPassword}
                  hasFeedback
                  feedbackStatus={confNewPassFeedbackStatus}
                  isDisabled={changePassword.loading}
                />

                <Button
                  style={styles.buttonStyle}
                  isLoading={changePassword.loading}
                  isLoadingText="Change Password"
                  onPress={handleSubmit}
                >
                  Change Password
                </Button>
              </View>
            );
          }}
        </Formik>
      </View>
    </>
  );
};

export default ChangePassword;
