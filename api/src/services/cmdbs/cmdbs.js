import { db } from 'src/lib/db'

export const cmdbs = () => {
  return db.cmdb.findMany()
}

export const cmdb = ({ id }) => {
  return db.cmdb.findUnique({
    where: { id },
  })
}

export const createCmdb = ({ input }) => {
  return db.cmdb.create({
    data: input,
  })
}

export const updateCmdb = ({ id, input }) => {
  return db.cmdb.update({
    data: input,
    where: { id },
  })
}

export const deleteCmdb = ({ id }) => {
  return db.cmdb.delete({
    where: { id },
  })
}

export const Cmdb = {
  Ticket: (_obj, { root }) =>
    db.cmdb.findUnique({ where: { id: root.id } }).Ticket(),
}
