/* eslint-disable react/prop-types */
import { Alert, Button, HStack, ScrollView, Stack } from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  Appbar,
  HelperText,
  TextInput as TextInputRNPaper
} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Image, View, TouchableOpacity } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useWatch } from 'react-hook-form'

import PaperDropdown from '../../components/picker/PaperDropdown'
import validationSchema from './validationSchema'
import TextInput from '../../components/text-input/TextInput'
import dayjs from 'dayjs'
import { ErrorMessage } from '@hookform/error-message'
import * as ImagePicker from "expo-image-picker"

const Detail = ({
  initialValues = {},
  ranks = [],
  statuses = [],
  onSubmit,
  onBackPress,
}) => {
  // const navigation = useNavigation()
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

  const imageHook = useWatch({
    control,
    name: "image",
  })

  const [date, setDate] = useState(new Date())
  const [showDate, setShowDate] = useState(false)
  const [image, setImage] = useState(null);

  const handleBornDateSave = () => {
    setValue('born_date', date, { shouldValidate: true })
    setShowDate(false)
  }

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        allowsEditing: true,
      });
      console.log("result", result);
      if (!result.cancelled) {
        // setValue("image", result.assets[0], { shouldValidate: true });
        setImage(result.uri);
      }
    } catch (e) {
      console.log("err", e);
    }
  }

  useEffect(() => {
    register('born_date')
  }, [register])

  return (
    <Stack flex={1}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBackPress} />
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
            list={ranks}
            // value={rank}
            // setValue={setRank}
            mode="outlined"
          />
          <PaperDropdown
            label="Status"
            name="status_id"
            control={control}
            list={statuses}
            // value={status}
            // setValue={setStatus}
            mode="outlined"
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {image && (
              <Image
                style={{
                  width: 200,
                  height: 200,
                }}
                alt="img-content"
                borderRadius={8}
                source={{ uri: image }}
                resizeMode="cover"
              />
            )}
            <ErrorMessage
              errors={formState.errors}
              name="image"
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
            <Button onPress={pickImage}>
              Pick Image
            </Button>
          </View>
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
