import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import * as util from 'src/lib/util'
import { logger } from 'src/lib/logger'

const CREATE_ASSET_ROLES = ['asset_doer', 'asset_admin', 'admin']
const READ_ASSET_ROLES = ['asset_doer', 'asset_admin', 'admin']
const UPDATE_ASSET_ROLES = ['asset_doer', 'asset_admin', 'admin']
const UPDATE_ASSET_SOLVED_ROLES = ['asset_admin', 'admin']
const DELETE_ASSET_ROLES = ['asset_admin', 'admin']
//requireAuth({ role: DELETE_ASSET_ROLES })

export const cmdbs = () => {
  requireAuth({ role: READ_ASSET_ROLES })
  return db.cmdb.findMany()
}

export const cmdb = ({ id }) => {
  requireAuth({ role: READ_ASSET_ROLES })
  return db.cmdb.findUnique({
    where: { id },
  })
}

export const createCmdb = ({ input }) => {
  requireAuth({ role: CREATE_ASSET_ROLES })
  return db.cmdb.create({
    data: input,
  })
}

export const updateCmdb = ({ id, input }) => {
  requireAuth({ role: UPDATE_ASSET_ROLES })
  return db.cmdb.update({
    data: input,
    where: { id },
  })
}

export const deleteCmdb = ({ id }) => {
  requireAuth({ role: DELETE_ASSET_ROLES })
  return db.cmdb.delete({
    where: { id },
  })
}

export const Cmdb = {
  Ticket: (_obj, { root }) =>
    db.cmdb.findUnique({ where: { id: root.id } }).Ticket(),
}
