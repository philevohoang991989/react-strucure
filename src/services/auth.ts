// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { CustomBaseQuery } from './baseQuery'
import { LoginParams, UserResponse } from 'interfaces/auth'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: CustomBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginParams>({
      query: (credentials) => ({
        url: '/users/sign_in', // TODO: fix URL
        method: 'POST',
        body: credentials
      })
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = authApi
