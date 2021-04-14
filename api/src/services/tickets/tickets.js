import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import * as util from 'src/lib/util'
import { logger } from 'src/lib/logger'
import rules from 'src/rules/tickets/**.{js,ts}'
let beforeRulesArr = util.loadRules(rules, "before")
let afterRulesArr = util.loadRules(rules, "after")


const CREATE_TASK_ROLES = ['task_doer', 'task_admin', 'admin']
const READ_TASK_ROLES = ['task_doer', 'task_admin', 'admin']
const UPDATE_TASK_ROLES = ['task_doer', 'task_admin', 'admin']
const UPDATE_TASK_SOLVED_ROLES = ['task_admin', 'admin']
const DELETE_TASK_ROLES = ['task_admin', 'admin']
//requireAuth({ role: READ_TASK_ROLES })

export const tickets = () => {
  requireAuth({ role: READ_TASK_ROLES })
  return db.ticket.findMany()
}

export const ticket = ({ id }) => {
  requireAuth({ role: READ_TASK_ROLES })
  let result = db.ticket.findUnique({
    where: { id },
  })
  return result
}

export const createTicket = async ({ input }) => {

  requireAuth({ role: CREATE_TASK_ROLES })
  var lastTicket = await db.ticket.findFirst({orderBy: [{number: 'desc'}],})
  if(lastTicket){
    logger.info(`lastTicket`, lastTicket);
    input.number = (parseInt(lastTicket.number,10)+1).toString()
    logger.info(`parseInt ${parseInt(lastTicket.number,10)}`)
  } else {
    input.number = '1000'
  }
  beforeRulesArr.forEach((rule)=>{
    logger.info(`Starting Before ${rule.title} ${rule.order}`)
    let previous = JSON.parse(JSON.stringify(input))
    rule.command(input);
    if(previous !== input){
      for (var prop in input){
        if(previous[prop] !== input[prop]){
          logger.info(`${prop} "${previous[prop]}"=>"${input[prop]}"`)
        }
      }
    }
    logger.info(`Ending Before ${rule.title}`)
  })
  let update = db.ticket.create({
    data: input,
  })
  afterRulesArr.forEach((rule)=>{
    logger.info(`Starting After ${rule.title} ${rule.order}`)
    let previous = JSON.stringify(input)
    previous = JSON.parse(previous)
    rule.command(input);
    if(previous !== input){
      for (var prop in input){
        if(previous[prop] !== input[prop]){
          logger.info(`${prop} "${previous[prop]}"=>"${input[prop]}"`)
        }
      }
    }
    logger.info(`Ending After ${rule.title}`)
  })
  return update;
}

export const updateTicket = ({ id, input }) => {
  requireAuth({ role: UPDATE_TASK_ROLES })

  if(input.state === "solved"){
    requireAuth({ role: UPDATE_TASK_SOLVED_ROLES })
  }
  return db.ticket.update({
    data: input,
    where: { id },
  })
}

export const deleteTicket = ({ id }) => {
  requireAuth({ role: DELETE_TASK_ROLES })
  return db.ticket.delete({
    where: { id },
  })
}

export const Ticket = {
  User: (_obj, { root }) =>
    db.ticket.findUnique({ where: { id: root.id } }).User(),
}
