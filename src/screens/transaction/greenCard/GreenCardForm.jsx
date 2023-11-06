import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Button, Skeleton } from "native-base";
import moment from "moment";
import { Formik } from "formik";
import { useAxios } from "../../../hooks";
import {
  areaService,
  findingService,
  hazardCategoryService,
  projectService,
} from "../../../services";
import {
  FormControlDatePicker,
  FormControlInput,
  FormControlSelect,
} from "../../../components";
import { styleSheet } from "./greenCardFormStyle";

const initFormData = {
  projectId: "",
  areaId: "",
  hazardCategoryId: "",
  findingId: "",
  hazardDescription: "",
  suggestion: "",
  hazardDate: moment().toDate(),
  hazardTime: moment().toDate(),
  hazardLocation: "",
};

const GreenCardForm = ({ onSubmit, fetchLoading, createGreenCard }) => {
  const getProject = useAxios();
  const getArea = useAxios();
  const getHazardCategory = useAxios();
  const getFinding = useAxios();
  const styles = styleSheet();

  const formikRef = useRef();

  const [formData, setFormData] = useState(initFormData);
  const [formValue, setFormValue] = useState(initFormData);
  const [formLoading, setFormLoading] = useState(true);

  const getProjectData = () => {
    getProject.axiosFetch(projectService.getDataDropdown());
  };

  const getAreaData = (projectId) => {
    const queryParams = { projectId };
    getArea.axiosFetch(areaService.getDataDropdown(queryParams));
  };

  const getHazardCategoryDate = () => {
    getHazardCategory.axiosFetch(hazardCategoryService.getDataDropdown());
  };

  const getFindingData = () => {
    getFinding.axiosFetch(findingService.getDataDropdown());
  };

  const handleValidate = (values) => {
    let errors = {};

    if (formLoading) {
      errors = {};
      return errors;
    } else {
      if (values.projectId === "")
        errors.projectId = "Lokasi Project tidak boleh kosong!";
      if (values.areaId === "") errors.areaId = "Area tidak boleh kosong!";
      if (values.hazardCategoryId === "")
        errors.hazardCategoryId = "Kategori Bahaya tidak boleh kosong!";
      if (values.findingId === "")
        errors.findingId = "Jenis Bahaya tidak boleh kosong!";
      if (values.hazardDescription === "")
        errors.hazardDescription = "Deskripsi Bahaya tidak boleh kosong!";
      if (values.hazardLocation === "")
        errors.hazardLocation = "Tempat Kejadian Bahaya tidak boleh kosong!";

      return errors;
    }
  };

  const handleFormChange = (values) => {
    if (values.projectId !== "") getAreaData(values.projectId);
  };

  useEffect(() => {
    getProjectData();
    getHazardCategoryDate();
    getFindingData();
  }, []);

  useEffect(() => {
    formikRef.current.setValues(formData);
  }, [formData]);

  useEffect(() => {
    handleFormChange(formValue);
  }, [formValue]);

  useEffect(() => {
    if (getProject.loading || getHazardCategory.loading || getFinding.loading) {
      setFormLoading(true);
    } else {
      setFormLoading(false);
    }
  }, [getProject, getHazardCategory, getFinding]);

  useEffect(() => {
    if (createGreenCard.isSuccess) {
      formikRef.current.setValues(initFormData);
    }
  }, [createGreenCard.isSuccess]);

  return (
    <>
      <View style={styles.container}>
        <Formik
          innerRef={formikRef}
          initialValues={formData}
          onSubmit={onSubmit}
          validate={handleValidate}
        >
          {({ handleChange, setFieldValue, handleSubmit, values, errors }) => {
            return (
              <View style={styles.formContainer}>
                <FormControlSelect
                  isRequired
                  isInvalid={"projectId" in errors}
                  label="Lokasi Project"
                  onValueChange={(value) => {
                    setFieldValue("areaId", "");
                    setFieldValue("projectId", value);
                    setFormValue((prev) => ({
                      ...prev,
                      projectId: value,
                      areaId: "",
                    }));
                  }}
                  selectedValue={values.projectId}
                  selectItems={
                    getProject.isSuccess &&
                    getProject.response.payload.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  }
                  errorMessage={errors.projectId}
                  isLoading={formLoading}
                  isDisabled={fetchLoading}
                />

                <FormControlSelect
                  isRequired
                  isInvalid={"areaId" in errors}
                  label="Area"
                  onValueChange={(value) => {
                    setFieldValue("areaId", value);
                  }}
                  selectedValue={values.areaId}
                  selectItems={
                    getArea.isSuccess &&
                    getArea.response.payload.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  }
                  errorMessage={errors.areaId}
                  isLoading={formLoading}
                  isDisabled={fetchLoading}
                />

                <FormControlSelect
                  isRequired
                  isInvalid={"hazardCategoryId" in errors}
                  label="Kategori Bahaya"
                  onValueChange={(value) => {
                    setFieldValue("hazardCategoryId", value);
                  }}
                  selectedValue={values.hazardCategoryId}
                  selectItems={
                    getHazardCategory.isSuccess &&
                    getHazardCategory.response.payload.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  }
                  errorMessage={errors.hazardCategoryId}
                  isLoading={formLoading}
                  isDisabled={fetchLoading}
                />

                <FormControlSelect
                  isRequired
                  isInvalid={"findingId" in errors}
                  label="Jenis Bahaya"
                  onValueChange={(value) => {
                    setFieldValue("findingId", value);
                  }}
                  selectedValue={values.findingId}
                  selectItems={
                    getFinding.isSuccess &&
                    getFinding.response.payload.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  }
                  errorMessage={errors.findingId}
                  isLoading={formLoading}
                  isDisabled={fetchLoading}
                />

                <FormControlInput
                  isRequired
                  isInvalid={"hazardDescription" in errors}
                  label="Deskripsi Bahaya"
                  type="text"
                  returnKeyType="next"
                  defaultValue={values.hazardDescription}
                  onChangeText={handleChange("hazardDescription")}
                  errorMessage={errors.hazardDescription}
                  isLoading={formLoading}
                  isDisabled={fetchLoading}
                />

                <FormControlInput
                  label="Saran Perbaikan"
                  type="text"
                  returnKeyType="next"
                  defaultValue={values.suggestion}
                  onChangeText={handleChange("suggestion")}
                  errorMessage={errors.suggestion}
                  isLoading={formLoading}
                  isDisabled={fetchLoading}
                />

                <FormControlDatePicker
                  isRequired
                  label="Tanggal Kejadian Bahaya"
                  value={values.hazardDate}
                  mode="date"
                  onChange={(value) => {
                    setFieldValue("hazardDate", value);
                  }}
                  isLoading={formLoading}
                  isDisabled={fetchLoading}
                />

                <FormControlDatePicker
                  isRequired
                  label="Waktu Kejadian Bahaya"
                  value={values.hazardTime}
                  mode="time"
                  onChange={(value) => {
                    setFieldValue("hazardTime", value);
                  }}
                  isLoading={formLoading}
                  isDisabled={fetchLoading}
                />

                <FormControlInput
                  isRequired
                  isInvalid={"hazardLocation" in errors}
                  label="Tempat Kejadian Bahaya"
                  type="text"
                  returnKeyType="done"
                  defaultValue={values.hazardLocation}
                  onChangeText={handleChange("hazardLocation")}
                  errorMessage={errors.hazardLocation}
                  isLoading={formLoading}
                  isDisabled={fetchLoading}
                />

                {formLoading ? (
                  <Skeleton
                    h="10"
                    w={110}
                    borderRadius={5}
                    mb={1}
                    style={styles.buttonStyle}
                  />
                ) : (
                  <Button
                    style={styles.buttonStyle}
                    isLoading={fetchLoading}
                    isLoadingText="Submit"
                    onPress={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </View>
            );
          }}
        </Formik>
      </View>
    </>
  );
};

export default GreenCardForm;
