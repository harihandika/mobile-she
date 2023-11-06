import React, { useEffect, useState } from "react";
import { FormControl, Input, Pressable, Skeleton, Spinner } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";

const FormControlInput = (props) => {
  const {
    isRequired,
    label,
    innerRef,
    placeholder,
    defaultValue,
    value,
    type,
    returnKeyType,
    hasFeedback,
    feedbackStatus,
    onChangeText,
    onFocus,
    onBlur,
    onSubmitEditing,
    errorMessage,
    isInvalid,
    isDisabled,
    isLoading,
    inputMode,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [iconName, setIconName] = useState("");
  const [iconColor, setIconColor] = useState(colors.success);

  useEffect(() => {
    if (feedbackStatus === "success") {
      setIconName("checkmark-circle");
      setIconColor(colors.success);
    } else if (feedbackStatus === "error") {
      setIconName("close-circle");
      setIconColor(colors.error);
    } else if (feedbackStatus === "warning") {
      setIconName("alert-circle");
      setIconColor(colors.warning);
    }
  }, [feedbackStatus]);

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
          <Input
            ref={innerRef}
            h="9"
            fontSize="sm"
            placeholder={placeholder}
            placeholderTextColor={colors.text2}
            defaultValue={defaultValue || undefined}
            value={value || undefined}
            onChangeText={onChangeText}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            inputMode={inputMode || "text"}
            returnKeyType={returnKeyType}
            onFocus={onFocus}
            onBlur={onBlur}
            onSubmitEditing={onSubmitEditing}
            isReadOnly={isDisabled}
            InputRightElement={
              <>
                {feedbackStatus === undefined
                  ? null
                  : hasFeedback &&
                    feedbackStatus !== "validating" && (
                      <Ionicons
                        name={iconName}
                        size={20}
                        color={iconColor}
                        style={{ marginRight: 10 }}
                      />
                    )}
                {hasFeedback && feedbackStatus === "validating" && (
                  <Spinner
                    size={20}
                    color={colors.info}
                    style={{ marginRight: 10 }}
                  />
                )}
                {type === "password" && (
                  <Pressable
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={colors.text2}
                      style={{ marginRight: 10 }}
                    />
                  </Pressable>
                )}
              </>
            }
          />
        )}

        {errorMessage && (
          <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default FormControlInput;
