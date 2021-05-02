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

export const createCmdb = async ({ input }) => {
  requireAuth({ role: matrix.asset.create })
  let beforeCreateRulesArr = util.loadRules(rules, "before", "create")
  beforeCreateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Create Rule "${rule.title}" ${rule.order}`)
    rule.command(input, null);
    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }
    logger.info(`Ending Before Create Rule "${rule.title}"`)
  })
  let create = db.cmdb.create({
    data: input,
  })

  let afterCreateRulesArr = util.loadRules(rules, "after", "create")
  afterCreateRulesArr.forEach((rule) => {
    logger.info(`Starting After Create Rule "${rule.title}" ${rule.order}`)
    rule.command(create, null);
    logger.info(`Ending After Create Rule "${rule.title}"`)
  })
  return create;
}

export const updateCmdb = async ({ id, input }) => {
  requireAuth({ role: matrix.asset.update })
  let previous = await db.cmdb.findUnique({
    where: { id }
  })
  let beforeUpdateRulesArr = util.loadRules(rules, "before", "update")
  beforeUpdateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Update Rule "${rule.title}" ${rule.order}`)
    rule.command(input, previous);
    if (previous !== input) {
      for (var prop in input) {
        if (previous[prop] !== input[prop]) {
          logger.info(`  ${prop} "${previous[prop]}"=>"${input[prop]}"`)
        }
      }
    }
    logger.info(`Ending   Before Update Rule "${rule.title}"`)
  })

  let update = await db.cmdb.update({
    data: input,
    where: { id },
  })
  let afterUpdateRulesArr = util.loadRules(rules, "after", "update")
  afterUpdateRulesArr.forEach((rule) => {
    logger.info(`Starting After Update Rule "${rule.title}" ${rule.order}`)
    rule.command(update, previous);
    logger.info(`Ending   After Update Rule "${rule.title}"`)
  })
  return update;
}

export const deleteCmdb = async ({ id }) => {
  requireAuth({ role: matrix.asset.delete })
  let previous = await db.cmdb.findUnique({
    where: { id },
  })

  let beforeDeleteRulesArr = util.loadRules(rules, "before", "delete")
  beforeDeleteRulesArr.forEach((rule) => {
    logger.info(`Starting Before Delete Rule "${rule.title}" ${rule.order}`)
    logger.info(`Deleting ${JSON.stringify(previous, '', ' ')}`)
    rule.command(null, previous);//
    logger.info(`Ending   Before Delete Rule "${rule.title}"`)
  })

  let deleteCmdb = db.cmdb.delete({
    where: { id },
  })
  let afterDeleteRulesArr = util.loadRules(rules, "after", "delete")
  afterDeleteRulesArr.forEach((rule) => {
    logger.info(`Starting After Delete Rule "${rule.title}" ${rule.order}`)
    rule.command(deleteCmdb, previous);
    logger.info(`Ending   After Delete Rule "${rule.title}"`)
  })
  return deleteCmdb;
}

export const Cmdb = {
  Ticket: (_obj, { root }) =>
    db.cmdb.findUnique({ where: { id: root.id } }).Ticket(),
}
