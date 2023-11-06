import React, { useState } from "react";
import { FormControl, Input, Modal, Skeleton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";
import { Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const FormControlDatePicker = (props) => {
  const {
    isRequired,
    label,
    innerRef,
    value,
    mode,
    onChange,
    errorMessage,
    isInvalid,
    isDisabled,
    isLoading,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event, date) => {
    onChange(date);
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (!isDisabled) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <FormControl
        isRequired={isRequired}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
      >
        {label && (
          <>
            {isLoading ? (
              <Skeleton h="3" w="24" borderRadius={5} mb={1} />
            ) : (
              <FormControl.Label>{label}</FormControl.Label>
            )}
          </>
        )}

        {isLoading ? (
          <Skeleton h="8" borderRadius={5} />
        ) : (
          <>
            <Input
              ref={innerRef}
              h="9"
              fontSize="sm"
              type="text"
              defaultValue={
                mode === "date"
                  ? moment(value).format("DD-MM-YYYY").toString()
                  : moment(value).format("HH:mm:ss").toString()
              }
              value={
                mode === "date"
                  ? moment(value).format("DD-MM-YYYY").toString()
                  : moment(value).format("HH:mm:ss").toString()
              }
              isReadOnly={true}
              InputRightElement={
                <TouchableOpacity
                  activeOpacity={isDisabled ? 1 : 0.5}
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onPress={handleOpen}
                >
                  <Ionicons
                    name={mode === "date" ? "calendar-outline" : "time-outline"}
                    size={20}
                    color={colors.text2}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              }
            />
            {Platform.OS === "ios" ? (
              <Modal
                isOpen={Platform.OS === "ios" && isOpen}
                onClose={() => setIsOpen(false)}
              >
                <Modal.Content width={"95%"}>
                  <Modal.CloseButton />
                  <Modal.Header>
                    {mode === "date" ? "Date Picker" : "Time Picker"}
                  </Modal.Header>
                  <Modal.Body>
                    <DateTimePicker
                      value={value}
                      mode={mode}
                      display="inline"
                      onChange={handleChange}
                    />
                  </Modal.Body>
                </Modal.Content>
              </Modal>
            ) : (
              <>
                {isOpen && Platform.OS === "android" && (
                  <DateTimePicker
                    value={value}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={handleChange}
                  />
                )}
              </>
            )}
          </>
        )}

        {errorMessage && (
          <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default FormControlDatePicker;
