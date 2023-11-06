import React from "react";
import { FormControl, Select, Skeleton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";

const FormControlSelect = (props) => {
  const {
    isRequired,
    label,
    innerRef,
    placeholder,
    selectedValue,
    onValueChange,
    errorMessage,
    isInvalid,
    isDisabled,
    selectItems,
    isLoading,
  } = props;

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
          <Select
            isReadOnly
            ref={innerRef}
            h="9"
            fontSize="sm"
            placeholder={placeholder}
            placeholderTextColor={colors.text2}
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            dropdownIcon={
              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.text2}
                style={{ marginRight: 10 }}
              />
            }
          >
            {selectItems?.length > 0 &&
              selectItems.map((item, index) => (
                <Select.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
          </Select>
        )}

        {errorMessage && (
          <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default FormControlSelect;
