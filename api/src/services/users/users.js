import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { matrix } from 'src/lib/roles'


export const users = () => {
  requireAuth({ role: matrix.user.read })
  return db.user.findMany()
}

export const user = ({ id }) => {
  requireAuth({ role: matrix.user.read })
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  requireAuth({ role: matrix.user.create })
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  requireAuth({ role: matrix.user.update })
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  requireAuth({ role: matrix.user.delete })
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  Ticket: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).Ticket(),
}
