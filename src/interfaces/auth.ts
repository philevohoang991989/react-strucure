export interface ParamUser {
  email: string
  password: string
}
export interface LoginParams {
  user: ParamUser
}
export interface UserInfo {
  id: number
  email: string
  family_name: string
  first_name: string
  locale: string
  time_zone: string
  employee_id: number
  need_update_company: boolean
  is_company_admin: boolean
  teams?: string[]
  position?: any
  avatar?: any
  company_name: string
  is_team_admin: boolean
}
export interface UserResponse {
  current_user: UserInfo
  token: string
  role?: number
  status: number
  error?: any
  message?: string
}
