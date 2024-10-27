import { convertKeysToCamelCase } from 'src/utils/helper'
import firebase_app from '../config'
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'

const db = getFirestore(firebase_app)

const customersRef = collection(db, 'customers')
const setCustomersRef = doc(collection(db, 'customers'))

const queryGetCustomersByRoomId = roomId => {
  return query(roomRef, where('roomId', '==', roomId))
}

export default async function getCustomersData(collectionName) {
  const result = []
  const querySnapshot = await getDocs(collection(db, collectionName))
  querySnapshot.forEach(doc => {
    const data = convertKeysToCamelCase(doc.data())

    result.push({ ...data })
  })

  return result
}

export const addCustomer = async () => {
  const data = {
    name: 'Lê Thị Anh Nhi',
    phone_number: '0969771406',
    room_id: '23865cxHZVJcdCxSiFiD',
    address: '',
    is_owner: false,
    citizen_id: '123456789',
    citizen_back_photo: '',
    citizen_front_photo: '',
    citizen_date: new Date(),
    citizen_plate: '',
    date_birth: new Date(),
    document_state: false,
    occupation: '',
    residency_status: ''
  }
  await setDoc(setCustomersRef, data)
}
