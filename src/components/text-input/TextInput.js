/* eslint-disable react/prop-types */
import { Stack } from "native-base";
import React from "react";
import { useController } from "react-hook-form";
import {
  HelperText,
  TextInput as BaseTextInput,
  TextInputProps,
} from "react-native-paper";
import { ErrorMessage } from "@hookform/error-message";

type Props = TextInputProps & {
  name: String,
  control: any,
  defaultValue: String,
};

const TextInput = ({ name, control, defaultValue, ...restValues }: Props) => {
  const { field, formState } = useController({ control, name, defaultValue });

  return (
    <Stack>
      <BaseTextInput
        ref={field.ref}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        {...restValues}
      />
      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({ message }) => (
          <HelperText type="error" visible={!!message} style={{ fontSize: 12 }}>
            {message}
          </HelperText>
        )}
      />
    </Stack>
  );
};

export default TextInput;
