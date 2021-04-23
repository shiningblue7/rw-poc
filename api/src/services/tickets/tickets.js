import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import * as util from 'src/lib/util'
import { logger } from 'src/lib/logger'
import { matrix } from 'src/lib/roles'
import rules from 'src/rules/tickets/**.{js,ts}'
let beforeRulesArr = util.loadRules(rules, "before")
let afterRulesArr = util.loadRules(rules, "after")

//requireAuth({ role: READ_TASK_ROLES })

export const tickets = () => {
  requireAuth({ role: matrix.ticket.read })
  return db.ticket.findMany()
}

export const ticket = ({ id }) => {
  requireAuth({ role: matrix.ticket.read })
  let result = db.ticket.findUnique({
    where: { id },
  })
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
  beforeRulesArr.forEach((rule) => {
    logger.info(`Starting Before ${rule.title} ${rule.order}`)
    let previous = JSON.parse(JSON.stringify(input))
    rule.command(input);
    if (previous !== input) {
      for (var prop in input) {
        if (previous[prop] !== input[prop]) {
          logger.info(`${prop} "${previous[prop]}"=>"${input[prop]}"`)
        }
      }
    }
    logger.info(`Ending Before ${rule.title}`)
  })
  let update = db.ticket.create({
    data: input,
  })
  afterRulesArr.forEach((rule) => {
    logger.info(`Starting After ${rule.title} ${rule.order}`)
    let previous = JSON.stringify(input)
    previous = JSON.parse(previous)
    rule.command(input);
    if (previous !== input) {
      for (var prop in input) {
        if (previous[prop] !== input[prop]) {
          logger.info(`${prop} "${previous[prop]}"=>"${input[prop]}"`)
        }
      }
    }
    logger.info(`Ending After ${rule.title}`)
  })
  return update;
}

export const updateTicket = async ({ id, input }) => {
  let returnObj = {}
  requireAuth({ role: matrix.ticket.update })
  // read record first to get "previous"
  let previous = await db.ticket.findUnique({
    where: { id },
  })
  //return result
  console.log('previous', previous)
  if (previous.state === 'solved') {
    //requireAuth({ role: UPDATE_TASK_SOLVED_ROLES })
    returnObj = db.ticket.update({
      data: input,
      where: { id },
    })
  } else {
    returnObj = db.ticket.update({
      data: input,
      where: { id },
    })
  }
  return returnObj;
}

export const deleteTicket = ({ id }) => {
  requireAuth({ role: matrix.ticket.delete })
  return db.ticket.delete({
    where: { id },
  })
}

export const Ticket = {
  User: (_obj, { root }) =>
    db.ticket.findUnique({ where: { id: root.id } }).User(),
}
