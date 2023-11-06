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
  number: "",
  createdDate: moment().toDate(),
  createdTime: moment().toDate(),
  project: "",
  area: "",
  hazardCategory: "",
  finding: "",
  hazardDescription: "",
  suggestion: "",
  hazardDate: moment().toDate(),
  hazardTime: moment().toDate(),
  hazardLocation: "",
  createdBy: "",
  userPic: "",
  progressNote: "",
};

const GreenCardForm = ({ sourceData, formLoading }) => {
  const styles = styleSheet();

  const formikRef = useRef();

  const [formData, setFormData] = useState(initFormData);
  const [formValue, setFormValue] = useState(initFormData);

  const handleValidate = (values) => {
    let errors = {};

    return errors;
  };

  useEffect(() => {
    if (sourceData !== undefined) {
      formikRef.current.setValues({
        number: sourceData.number,
        createdDate: moment(sourceData.createdAt).toDate(),
        createdTime: moment(sourceData.createdAt).toDate(),
        project: sourceData.Project.name,
        area: sourceData.Area.name,
        hazardCategory: sourceData.HazardCategory.name,
        finding: sourceData.Finding.name,
        hazardDescription: sourceData.hazardDescription,
        suggestion: sourceData.suggestion,
        hazardDate: moment(sourceData.hazardDate).toDate(),
        hazardTime: moment(sourceData.hazardDate).toDate(),
        hazardLocation: sourceData.hazardLocation,
        createdBy: sourceData.createdBy,
        userPic: sourceData.PicUser !== null ? sourceData.PicUser.fullName : "",
        progressNote: sourceData.progressNote,
      });
    }
  }, [sourceData]);

  return (
    <>
      <View style={styles.container}>
        <Formik
          innerRef={formikRef}
          initialValues={formData}
          validate={handleValidate}
        >
          {({ values }) => {
            return (
              <View style={styles.formContainer}>
                <FormControlInput
                  label="Ticket No"
                  type="text"
                  defaultValue={values.number}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlDatePicker
                  label="Tanggal Submit"
                  value={values.createdDate}
                  mode="date"
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlDatePicker
                  label="Waktu Submit"
                  value={values.createdTime}
                  mode="time"
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="Jenis Bahaya"
                  type="text"
                  defaultValue={values.finding}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="Kategori Bahaya"
                  type="text"
                  defaultValue={values.hazardCategory}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlDatePicker
                  label="Tanggal Kejadian Bahaya"
                  value={values.hazardDate}
                  mode="date"
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlDatePicker
                  label="Waktu Kejadian Bahaya"
                  value={values.hazardTime}
                  mode="time"
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="Deskripsi Bahaya"
                  type="text"
                  defaultValue={values.hazardDescription}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="Saran Perbaikan"
                  type="text"
                  defaultValue={values.suggestion}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="Project"
                  type="text"
                  defaultValue={values.project}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="Area"
                  type="text"
                  defaultValue={values.area}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="Tempat Kejadian Bahaya"
                  type="text"
                  defaultValue={values.hazardLocation}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="Disubmit Oleh"
                  type="text"
                  defaultValue={values.createdBy}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="PIC"
                  type="text"
                  defaultValue={values.userPic}
                  isDisabled={true}
                  isLoading={formLoading}
                />

                <FormControlInput
                  label="Note"
                  type="text"
                  defaultValue={values.progressNote}
                  isDisabled={true}
                  isLoading={formLoading}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </>
  );
};

export default GreenCardForm;
