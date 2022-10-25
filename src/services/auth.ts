// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { CustomBaseQuery } from './baseQuery'

export interface currentUser {
  email: string
  family_name?: string
  first_name?: string
  is_updated_company?: boolean
  locale?: string
  position?: string
  teams?: string[]
  time_zone?: string
}

export interface User {
  current_user: currentUser
  role: any
}

export interface UserResponse {
  error?: any
  current_user: currentUser
  message: string
  status: number
}

export interface emailConfirm {
  status: number
  message: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface SignUpRequest {
  familyName: string
  firstName: string
  email: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ChangePasswordRequest {
  current_password: string
  password: string
  password_confirmation: string
}

export interface ResetPasswordRequest {
  reset_password_token: string
  password: string
  password_confirmation: string
}
export interface Locale {
  locale: string
}
export interface LocaleRequest {
  user: Locale
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: CustomBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginRequest>({
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
