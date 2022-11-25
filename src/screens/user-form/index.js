import React from 'react'
import { useGetRanksQuery } from '../../services/rankAPI'
import { useGetStatusQuery } from '../../services/statusAPI'
import { usePostPersMutation } from '../../services/persAPI'
import Detail from './detail'

const UserFormScreen = ({ navigation }) => {
  
  const initialValues = {
    nrp: '',
    name: '',
    born_place: '',
    born_date: null,
    address: '',
    rank_id: '',
    status_id: ''
  }

  const [postPers] = usePostPersMutation()

  const ranks = useGetRanksQuery().data?.data
    .map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })

  const statuses = useGetStatusQuery().data?.data
    .map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })

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

  return (
    <Detail
      initialValues={initialValues}
      ranks={ranks}
      statuses={statuses}
      onSubmit={onSubmit}
      onBackPress={() => navigation.goBack()}
    />
  )
}

export default UserFormScreen
