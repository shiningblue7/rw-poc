import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import * as util from 'src/lib/util'
import { logger } from 'src/lib/logger'
import { matrix } from 'src/lib/roles'

export const cmdbs = () => {
  requireAuth({ role: matrix.asset.read })
  return db.cmdb.findMany()
}

export const cmdb = ({ id }) => {
  requireAuth({ role: matrix.asset.read })
  return db.cmdb.findUnique({
    where: { id },
  })
}

export const createCmdb = ({ input }) => {
  requireAuth({ role: matrix.asset.create })
  return db.cmdb.create({
    data: input,
  })
}

export const updateCmdb = ({ id, input }) => {
  requireAuth({ role: matrix.asset.update })
  return db.cmdb.update({
    data: input,
    where: { id },
  })
}

export const deleteCmdb = ({ id }) => {
  requireAuth({ role: matrix.asset.delete })
  return db.cmdb.delete({
    where: { id },
  })
}

export const Cmdb = {
  Ticket: (_obj, { root }) =>
    db.cmdb.findUnique({ where: { id: root.id } }).Ticket(),
}
