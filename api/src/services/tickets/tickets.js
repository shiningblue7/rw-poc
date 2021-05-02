import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import * as util from 'src/lib/util'
import { logger } from 'src/lib/logger'
import { matrix } from 'src/lib/roles'
import rules from 'src/rules/tickets/**.{js,ts}'

export const tickets = () => {
  requireAuth({ role: matrix.ticket.read })
  return db.ticket.findMany()
}

export const ticket = async ({ id }) => {
  requireAuth({ role: matrix.ticket.read })
  let result = await db.ticket.findUnique({
    where: { id },
    include: {
      User: true
    }
  })

  logger.info(`read ticket`, result);
  return result
}

export const createTicket = async ({ input }) => {
  requireAuth({ role: matrix.ticket.create })
  var lastTicket = await db.ticket.findFirst({ orderBy: [{ number: 'desc' }], })
  if (lastTicket) {
    logger.info(`lastTicket`, lastTicket);
    input.number = (parseInt(lastTicket.number, 10) + 1).toString()
    logger.info(`parseInt ${parseInt(lastTicket.number, 10)}`)
  } else {
    input.number = '1000'
  }
  let beforeCreateRulesArr = util.loadRules(rules, "before", "create")
  beforeCreateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Create Rule "${rule.title}" ${rule.order}`)
    rule.command(input, null);
    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }
    logger.info(`Ending Before Create Rule "${rule.title}"`)
  })
  let create = db.ticket.create({
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

export const updateTicket = async ({ id, input }) => {
  requireAuth({ role: matrix.ticket.update })
  let previous = await db.ticket.findUnique({
    where: { id },
    include: {
      User: true
    }
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

  let update = await db.ticket.update({
    data: input,
    where: { id },
    include: {
      User: true
    }
  })
  let afterUpdateRulesArr = util.loadRules(rules, "after", "update")
  afterUpdateRulesArr.forEach((rule) => {
    logger.info(`Starting After Update Rule "${rule.title}" ${rule.order}`)
    rule.command(update, previous);
    logger.info(`Ending   After Update Rule "${rule.title}"`)
  })
  return update;
}

export const deleteTicket = async ({ id }) => {
  requireAuth({ role: matrix.ticket.delete })
  let previous = await db.ticket.findUnique({
    where: { id },
  })

  let beforeDeleteRulesArr = util.loadRules(rules, "before", "delete")
  beforeDeleteRulesArr.forEach((rule) => {
    logger.info(`Starting Before Delete Rule "${rule.title}" ${rule.order}`)
    logger.info(`Deleting ${JSON.stringify(previous, '', ' ')}`)
    rule.command(null, previous);//
    logger.info(`Ending   Before Delete Rule "${rule.title}"`)
  })

  let deleteTicket = db.ticket.delete({
    where: { id },
    include: {
      User: true
    }
  })
  let afterDeleteRulesArr = util.loadRules(rules, "after", "delete")
  afterDeleteRulesArr.forEach((rule) => {
    logger.info(`Starting After Delete Rule "${rule.title}" ${rule.order}`)
    rule.command(deleteTicket, previous);
    logger.info(`Ending   After Delete Rule "${rule.title}"`)

  })
  return deleteTicket;
}

export const Ticket = {
  User: (_obj, { root }) =>
    db.ticket.findUnique({ where: { id: root.id } }).User(),
}
