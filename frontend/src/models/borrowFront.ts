import axios from 'axios'
import { BACK } from './constants'

export type Borrow = {
    distributor_name: string
    distributor_lastname: string
    receiver_name: string
    receiver_lastname: string
    receiving_date: string
    equipment_id: string
}

const baseUrl = `${BACK}/borrow`

export const getBorrows = async () => {
    const url = `${baseUrl}/get`
    const response = await axios.get<Borrow[]>(url)
    return response.data
}

export const getBorrow = async (id: string) => {
    const url = `${baseUrl}/get/${id}`
    const response = await axios.get<Borrow>(url)
    return response.data
}

export const createBorrow = async (borrow: Borrow) => {
    const url = `${baseUrl}/create`
    const response = await axios.post<Borrow>(url, borrow)
    return response.data
}

export const updateBorrow = async (borrow: Borrow) => {
    const url = `${baseUrl}/update`
    const response = await axios.put<Borrow>(url, borrow)
    return response.data
}

export const deleteBorrow = async (id: string) => {
    const url = `${baseUrl}/delete/${id}`
    const response = await axios.delete<Borrow>(url)
    return response.data
}