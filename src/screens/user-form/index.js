import React from 'react'
import Detail from './detail'

const UserFormScreen = () => {
  const initialValues = {
    nrp: '',
    name: '',
    born_place: '',
    born_date: null,
    address: '',
    rank_id: '',
    status_id: ''
  }
  return <Detail initialValues={initialValues} />
}

export default UserFormScreen
