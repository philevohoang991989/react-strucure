import { useMemo } from 'react'
import { selectCurrentUser } from 'store/auth'
import { useTypedSelector } from './store'
import { ERoles } from 'enums/roles'

export const useAuth = () => {
  const user = useTypedSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}

export const useIsRoleAdmin = () => {
  const user = useTypedSelector(selectCurrentUser)
  const isAdmin = user ? user?.role === ERoles.ADMIN : null

  return useMemo(() => isAdmin, [isAdmin])
}
