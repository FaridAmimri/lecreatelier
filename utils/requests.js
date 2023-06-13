/** @format */

import axios from 'axios'

const BASE_URL = 'https://lecreatelier.vercel.app/api/'

export const publicRequest = axios.create({
  baseURL: BASE_URL
})
