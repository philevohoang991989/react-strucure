import { message } from 'antd'
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query'
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import services from 'services'
import { resetCredentials } from 'store/auth'
import { RootState } from 'store'
import { storageKeys } from 'constants/storage-keys'

const StorageService = services.get('StorageService')

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_ENDPOINT || 'http://localhost:3000/api',

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const meetingBaseQuery = fetchBaseQuery({
  baseUrl:
    process.env.MEETING_API_ENDPOINT || 'https://dev.newjivr-server.bnksolution.com/meeting/api',

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

export const CustomBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error) {
    return handleErrorMessage(result.error, api)
  }

  return result
}

export const MeetingBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await meetingBaseQuery(args, api, extraOptions)
  if (result.error) {
    return handleErrorMessage(result.error, api)
  }

  return result
}

type ErrorDataType = {
  error?: any
  status: number
  success: boolean
}

const handleErrorMessage = (resultError: FetchBaseQueryError, api: BaseQueryApi) => {
  // ERR_INTERNET_DISCONNECTED
  if (resultError.status === 'FETCH_ERROR') {
    message.error('Network error Please check your network connection and try again')
  }

  // ERROR SERVER
  const errorData =
    typeof resultError.data === 'object' ? (resultError.data as ErrorDataType) : null
  if (errorData) {
    switch (resultError.status) {
      // Handle return notification if error is 401
      // Other case, component will handle return notification
      case 401: {
        // Clear local data to return to login screen
        api.dispatch(resetCredentials())
        StorageService.remove(storageKeys.authProfile)
        StorageService.remove(storageKeys.accessToken)
        // Check and return constant message

        message.error('You are not authorized to make this request')

        // return null so the component will not return notification
        errorData['message'] = null
        break
      }
      case 422: {
        if (api.endpoint === 'updateAccount') {
          message.error('This email address is already registered')
        }
        if (api.endpoint === 'updateMyInformation') {
          message.error('Personalization change failed')
        }
        break
      }

      // Internal Server Error
      case 500:
        message.error('something went wrong')
        break
      default: {
        message.error('something went wrong')
        break
      }
    }
  }

  const errorResponse = {
    status: resultError.status,
    data: {
      error: errorData,
      status: resultError.status,
      success: false
    }
  }

  return errorResponse
}
