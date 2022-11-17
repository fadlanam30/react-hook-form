import React, { useState } from 'react'
import DropDown, {DropDownPropsInterface} from 'react-native-paper-dropdown'

const PaperDropdown = (props: DropDownPropsInterface) => {
  const [showDropDown, setShowDropDown] = useState(false)
  return (
    <DropDown
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      {...props}
    />
  )
}

export default PaperDropdown
