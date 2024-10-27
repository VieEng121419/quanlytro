import { convertDateTime, convertKeysToCamelCase } from 'src/utils/helper'
import firebase_app from '../config'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'

const db = getFirestore(firebase_app)

const roomRef = collection(db, 'room')
const customersRef = collection(db, 'customers')

const queryGetCustomersByRoomId = roomId => {
  return query(customersRef, where('room_id', '==', roomId))
}

export default async function getRoomData(collectionName) {
  const result = []
  const querySnapshot = await getDocs(collection(db, collectionName))
  querySnapshot.forEach(doc => {
    const data = convertKeysToCamelCase(doc.data())

    result.push({ ...data, id: doc.id, joinDate: convertDateTime(new Date(data.joinDate.seconds * 1000)) })
  })

  return result
}

export const getRoomWithCustomers = async () => {
  const result = []
  const roomsSnapshot = await getDocs(collection(db, 'room'))

  const rooms = await Promise.all(
    roomsSnapshot.docs.map(async doc => {
      const roomData = doc.data()

      const customersSnapshot = await getDocs(queryGetCustomersByRoomId(doc.id))

      const customers = customersSnapshot.docs.map(customerDoc => customerDoc.data())

      let roomDataParsed = convertKeysToCamelCase(roomData)
      const customersParsed = customers.map(customer => convertKeysToCamelCase(customer))

      roomDataParsed = {
        ...roomDataParsed,
        id: doc.id,
        joinDate: convertDateTime(new Date(roomDataParsed.joinDate.seconds * 1000)),
        customers: customersParsed
      }

      return roomDataParsed
    })
  )

  return rooms
}
