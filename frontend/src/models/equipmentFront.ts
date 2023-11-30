import axios from "axios"
import { BACK } from "./constants"

export type Equipment = {
    id?: string
    name: string
    brand: string
    maintenance: string
    consumables: string
    spare_parts: string
    installation: string
    warranty: string
    training: string
    norms: string
    accessories: string
}

const baseUrl = `${BACK}/equipment`

export const getEquipments = async () => {
    const url = `${baseUrl}/get`
    const response = await axios.get<Equipment[]>(url)
    return response.data
}

export const getEquipment = async (id: string) => {
    const url = `${baseUrl}/get/${id}`
    const response = await axios.get<Equipment>(url)
    return response.data
}

export const getEquipmentByPattern = async (pattern: string) => {
    const url = `${baseUrl}/getPattern/${pattern}`
    const response = await axios.get<Equipment[]>(url)
    return response.data
}

export const createEquipment = async (equipment: Equipment) => {
    const url = `${baseUrl}/create`
    const response = await axios.post<Equipment>(url, equipment)
    return response.data
}

export const updateEquipment = async (equipment: Equipment) => {
    const url = `${baseUrl}/update/${equipment.id}`
    const response = await axios.put<Equipment>(url, equipment)
    return response.data
}

export const deleteEquipment = async (id: string) => {
    const url = `${baseUrl}/delete/${id}`
    const response = await axios.delete<Equipment>(url)
    return response.data
}
