/* eslint-disable react/prop-types */
import { Alert, Button, HStack, ScrollView, Stack } from 'native-base'
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
import { useGetRanksQuery } from '../../services/rankAPI'
import { useGetStatusQuery } from '../../services/statusAPI'
import { usePostPersMutation } from '../../services/persAPI'

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
  const [rank, setRank] = useState('')
  const [status, setStatus] = useState('')

  const [postPers] = usePostPersMutation()

  const ranks = useGetRanksQuery().data?.data || []

  const listRank = ranks.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })

  const statuses = useGetStatusQuery().data?.data || []

  const listStatus = statuses.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate
  //   setShowDate(false)
  //   setDate(handleBornDateSave(currentDate))
  //   console.log('currentDate', currentDate)
  // }

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
    postPers(payload)
    .unwrap()
    .then((_) => navigation.goBack())
    .catch((err) => {
      console.log('error', err)
      Alert.alert('Error', err.data.error)
    })
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
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                is24Hour
                mode="date"
                display="default"
                onChange={(_, date) => {
                  setShowDate(false)
                  setDate(date)
                  handleBornDateSave()
                }}
              />
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
            name="rank_id"
            control={control}
            list={listRank}
            // value={rank}
            // setValue={setRank}
            mode="outlined"
          />
          <PaperDropdown
            label="Status"
            name="status_id"
            control={control}
            list={listStatus}
            // value={status}
            // setValue={setStatus}
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
