/* eslint-disable react/prop-types */
import { Button, HStack, ScrollView, Stack } from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  Appbar,
  HelperText,
  TextInput as TextInputRNPaper
} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TouchableOpacity } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useWatch } from 'react-hook-form'

import PaperDropdown from '../../components/picker/PaperDropdown'
import validationSchema from './validationSchema'
import TextInput from '../../components/text-input/TextInput'
import dayjs from 'dayjs'
import { ErrorMessage } from '@hookform/error-message'
import { useNavigation } from '@react-navigation/native'

const Detail = ({ initialValues = {} }) => {
  const navigation = useNavigation()
  const methods = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  })

  const { formState, control, register, setValue, handleSubmit } = methods

  const bornDateHook = useWatch({
    control,
    name: 'born_date'
  })

  const [date, setDate] = useState(new Date())
  const [showDate, setShowDate] = useState(false)
  const [gender, setGender] = useState('')

  const genderList = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    },
    {
      label: 'Others',
      value: 'others'
    }
  ]

  const handleBornDateSave = () => {
    setValue('born_date', date, { shouldValidate: true })
    setShowDate(false)
  }

  const onSubmit = (values) => {
    const payload = {
      ...values,
      born_date: dayjs(values.born_date).format('DD MMMM YYYY')
    }
    console.log('payload', payload)
  }

  useEffect(() => {
    register('born_date')
  }, [register])

  return (
    <Stack flex={1}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Add User" />
      </Appbar.Header>
      <ScrollView _contentContainerStyle={{ p: 4 }}>
        <Stack space={4}>
          <TextInput
            name="nrp"
            label="Nomor Personil"
            mode="outlined"
            keyboardType="number-pad"
            control={control}
          />
          <TextInput
            name="name"
            label="Nama Personil"
            mode="outlined"
            control={control}
          />
          <TextInput
            name="born_place"
            label="Tempat Lahir"
            mode="outlined"
            control={control}
          />

          <Stack>
            <TouchableOpacity onPress={() => setShowDate(true)}>
              <TextInputRNPaper
                pointerEvents="none"
                label="Tanggal Lahir"
                mode="outlined"
                value={
                  bornDateHook ? dayjs(bornDateHook).format('DD MMMM YYYY') : ''
                }
              />
            </TouchableOpacity>
            {showDate && (
              <Stack>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  is24Hour
                  mode="date"
                  display="spinner"
                  onChange={(_, date) => setDate(date)}
                />
                <HStack space={4} justifyContent="flex-end">
                  <Button
                    onPress={() => setShowDate(false)}
                    colorScheme="indigo"
                    size="sm"
                  >
                    Close
                  </Button>
                  <Button
                    onPress={handleBornDateSave}
                    colorScheme="indigo"
                    size="sm"
                  >
                    Save
                  </Button>
                </HStack>
              </Stack>
            )}

            <ErrorMessage
              errors={formState.errors}
              name="born_date"
              render={({ message }) => (
                <HelperText
                  type="error"
                  visible={!!message}
                  style={{ fontSize: 12 }}
                >
                  {message}
                </HelperText>
              )}
            />
          </Stack>

          <TextInput
            multiline
            name="address"
            label="Alamat"
            mode="outlined"
            control={control}
          />
          <PaperDropdown
            label="Rank"
            list={genderList}
            value={gender}
            setValue={setGender}
            mode="outlined"
          />
          <PaperDropdown
            label="Status"
            list={genderList}
            value={gender}
            setValue={setGender}
            mode="outlined"
          />
          <Button
            onPress={handleSubmit(onSubmit)}
            colorScheme="indigo"
            size="lg"
          >
            Submit
          </Button>
        </Stack>
      </ScrollView>
    </Stack>
  )
}

export default Detail
