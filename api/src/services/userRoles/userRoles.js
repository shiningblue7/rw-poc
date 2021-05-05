import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { matrix } from 'src/lib/roles'


export const userRoles = () => {
  requireAuth({ role: matrix.userRole.read })
  return db.userRole.findMany()
}


export const createUserRole = ({ input }) => {
  //requireAuth()
  return db.userRole.create({
    data: input,
  })
}

export const UserRole = {
  User: (_obj, { root }) =>
    db.userRole.findUnique({ where: { id: root.id } }).User(),
}
