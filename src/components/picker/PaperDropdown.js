import { ErrorMessage } from '@hookform/error-message'
import { View } from 'native-base'
import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import { HelperText } from 'react-native-paper'
import DropDown, { DropDownPropsInterface } from 'react-native-paper-dropdown'

const PaperDropdown = ({
  name, control, defaultValue, ...props
}) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const { field, formState: { errors } } = useController(
    { control, name, defaultValue }
  )

  return (
    <View>
      <DropDown
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={field.value}
        setValue={field.onChange}
        {...props}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <HelperText type="error" visible={!!message} style={{ fontSize: 12 }}>
            {message}
          </HelperText>
        )}
      />
    </View>
  )
}

export default PaperDropdown
