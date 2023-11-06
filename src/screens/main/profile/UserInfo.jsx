import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useJwt } from "react-jwt";
import { Formik } from "formik";
import { Button, FormControl, Radio, Skeleton } from "native-base";
import { FormControlInput, FormControlSelect } from "../../../components";
import { useAccessToken } from "../../../contexts";
import { useAxios } from "../../../hooks";
import { genderService, userService } from "../../../services";
import { styleSheet } from "./userInfoStyle";

const initFormData = {
  nrp: "",
  fullName: "",
  email: "",
  genderId: "",
  workLocation: "",
  position: "",
  organization: "",
  superior: "",
  role: "",
  isActive: "",
};

const UserInfo = () => {
  const styles = styleSheet();
  const { accessToken, renewAccessToken } = useAccessToken();
  const { decodedToken } = useJwt(accessToken || "");
  const getGender = useAxios();
  const checkEmail = useAxios();
  const updateUser = useAxios(true);

  const formikRef = useRef();

  const [formData, setFormData] = useState(initFormData);
  const [emailValue, setEmailValue] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailFeedbackStatus, setEmailFeedbackStatus] = useState(undefined);
  const [isFormLoading, setIsFormLoading] = useState(true);

  const getGenderData = () => {
    getGender.axiosFetch(genderService.getData());
  };

  const checkEmailExist = (email) => {
    if (emailValue.toLowerCase() === decodedToken.email) return;
    const queryParams = { email };
    checkEmail.axiosFetch(userService.checkEmailExist(queryParams));
  };

  const handleInitData = () => {
    setFormData((prev) => ({
      ...prev,
      nrp: decodedToken.nrp,
      fullName: decodedToken.fullName,
      email: decodedToken.email,
      genderId: decodedToken.Gender.id,
      workLocation: decodedToken.WorkLocation.name,
      position: decodedToken.Position.name,
      organization: decodedToken.Organization
        ? decodedToken.Organization.name
        : null,
      superior:
        decodedToken.Superior.length > 0
          ? decodedToken.Superior[0].fullName
          : "",
      role: decodedToken.Role.name,
      isActive: decodedToken.isActive,
    }));
  };

  const handleValidate = (values) => {
    const errors = {};

    if (values.fullName === "")
      errors.fullName = "Nama Lengkap tidak boleh kosong!";
    if (values.genderId === "")
      errors.genderId = "Jenis Kelamin tidak boleh kosong!";
    if (values.email === "") errors.email = "Email tidak boleh kosong!";

    return errors;
  };

  const onSubmit = (values) => {
    const queryParams = { id: decodedToken.id };
    const superiorIds =
      decodedToken.Superior.length > 0
        ? decodedToken.Superior.map((item) => item.id)
        : [];
    const payload = {
      nrp: values.nrp,
      fullName: values.fullName,
      genderId: values.genderId,
      email: values.email.toLowerCase(),
      workLocationId: decodedToken.workLocationId,
      positionId: decodedToken.positionId,
      organizationId: decodedToken.organizationId,
      superiorIds,
      roleId: decodedToken.roleId,
      isActive: values.isActive,
    };
    updateUser.axiosFetch(userService.selfUpdateData(queryParams, payload));
  };

  useEffect(() => {
    getGenderData();
  }, []);

  useEffect(() => {
    if (decodedToken) {
      handleInitData();
    }
  }, [decodedToken]);

  useEffect(() => {
    formikRef.current.setValues(formData);
    setEmailValue(formData.email);
  }, [formData]);

  useEffect(() => {
    if (emailValue.length !== 0) {
      setEmailLoading(true);

      const typingDelay = setTimeout(() => {
        checkEmailExist(emailValue.toLowerCase());
        setEmailLoading(checkEmail.loading);
      }, 1000);

      return () => clearTimeout(typingDelay);
    }
  }, [emailValue]);

  useEffect(() => {
    if (emailValue.toLocaleLowerCase() === decodedToken?.email) {
      setEmailFeedbackStatus("success");
    } else if (emailLoading) {
      setEmailFeedbackStatus("validating");
    } else if (emailValue === "") {
      setEmailFeedbackStatus(undefined);
    } else if (checkEmail.response.payload > 0) {
      setEmailFeedbackStatus("error");
    } else if (checkEmail.response.payload === 0) {
      setEmailFeedbackStatus("success");
    }
  }, [emailValue, checkEmail.isSuccess, emailLoading]);

  useEffect(() => {
    if (!getGender.loading && decodedToken) {
      setIsFormLoading(false);
    } else {
      setIsFormLoading(true);
    }
  }, [getGender.loading, decodedToken]);

  useEffect(() => {
    if (updateUser.isSuccess) {
      renewAccessToken(updateUser.response.payload.token);
    }
  }, [updateUser.isSuccess]);

  return (
    <>
      <View style={styles.container}>
        <Formik
          innerRef={formikRef}
          initialValues={formData}
          onSubmit={onSubmit}
          validate={handleValidate}
        >
          {({
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            values,
            errors,
          }) => {
            if (emailFeedbackStatus === "error")
              errors.email = "Email sudah terdaftar, gunakan yang lain!";
            return (
              <View style={styles.formContainer}>
                <FormControlInput
                  label="NRP"
                  type="text"
                  isDisabled
                  defaultValue={values.nrp}
                  isLoading={isFormLoading}
                />

                <FormControlInput
                  isRequired
                  isInvalid={"fullName" in errors}
                  label="Nama Lengkap"
                  type="text"
                  returnKeyType="next"
                  defaultValue={values.fullName}
                  onBlur={handleBlur("fullName")}
                  onChangeText={handleChange("fullName")}
                  errorMessage={errors.fullName}
                  isLoading={isFormLoading}
                  isDisabled={updateUser.loading}
                />

                <FormControlSelect
                  isRequired
                  label="Jenis Kelamin"
                  onValueChange={(value) => setFieldValue("genderId", value)}
                  selectedValue={values.genderId}
                  selectItems={
                    getGender.isSuccess &&
                    getGender.response.payload.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  }
                  errorMessage={errors.genderId}
                  isLoading={isFormLoading}
                  isDisabled={updateUser.loading}
                />

                <FormControlInput
                  isRequired
                  isInvalid={"email" in errors}
                  label="Email"
                  type="text"
                  returnKeyType="done"
                  defaultValue={values.email}
                  onBlur={handleBlur("email")}
                  onChangeText={(value) => {
                    setFieldValue("email", value);
                    setEmailValue(value);
                  }}
                  errorMessage={errors.email}
                  hasFeedback
                  feedbackStatus={emailFeedbackStatus}
                  isLoading={isFormLoading}
                  isDisabled={updateUser.loading}
                />

                <FormControlInput
                  label="Lokasi Kerja"
                  type="text"
                  isDisabled
                  defaultValue={values.workLocation}
                  isLoading={isFormLoading}
                />

                <FormControlInput
                  label="Jabatan"
                  type="text"
                  isDisabled
                  defaultValue={values.position}
                  isLoading={isFormLoading}
                />

                <FormControlInput
                  label="Organisasi"
                  type="text"
                  isDisabled
                  defaultValue={values.organization}
                  isLoading={isFormLoading}
                />

                <FormControlInput
                  label="Atasan Langsung"
                  type="text"
                  isDisabled
                  defaultValue={values.superior}
                  isLoading={isFormLoading}
                />

                <FormControlInput
                  label="Role"
                  type="text"
                  isDisabled
                  defaultValue={values.role}
                  isLoading={isFormLoading}
                />

                <View style={styles.formFooter}>
                  <FormControl isDisabled width="auto">
                    {isFormLoading ? (
                      <Skeleton h="3" w="24" borderRadius={5} mb={1} />
                    ) : (
                      <FormControl.Label>Status</FormControl.Label>
                    )}

                    {isFormLoading ? (
                      <>
                        <Skeleton h="6" w="40" borderRadius={5} my={1} />
                        <Skeleton h="6" w="40" borderRadius={5} my={1} />
                      </>
                    ) : (
                      <Radio.Group
                        value={values.isActive}
                        onChange={(value) => setFieldValue("isActive", value)}
                      >
                        <Radio value={true} size="sm" my={1}>
                          Active
                        </Radio>
                        <Radio value={false} size="sm" my={1}>
                          Inactive
                        </Radio>
                      </Radio.Group>
                    )}
                  </FormControl>

                  {isFormLoading ? (
                    <Skeleton h="10" w={110} borderRadius={5} mb={1} />
                  ) : (
                    <Button
                      style={styles.buttonStyle}
                      isLoading={updateUser.loading}
                      isLoadingText="Updating"
                      onPress={handleSubmit}
                    >
                      Update
                    </Button>
                  )}
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </>
  );
};

export default UserInfo;
