import { useMemo } from 'react'
import { selectCurrentUser } from 'store/auth'
import { useTypedSelector } from './store'
import { ERoles } from 'enums/roles'

export const useAuth = () => {
  const user: any = useTypedSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}

export const useIsRoleAdmin = () => {
  const user = useTypedSelector(selectCurrentUser)
  const isAdmin = user ? 4 === ERoles.ADMIN : null

  return useMemo(() => isAdmin, [isAdmin])
}
