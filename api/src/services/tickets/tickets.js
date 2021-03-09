import { db } from 'src/lib/db'
import * as util from 'src/lib/util'
import rules from 'src/rules/tickets/**.{js,ts}'
let beforeRulesArr = util.loadRules(rules, "before");
let afterRulesArr = util.loadRules(rules, "after");
//util.log(`rulesArr`, rulesArr)

export const tickets = () => {
  return db.ticket.findMany()
}

export const ticket = ({ id }) => {
  return db.ticket.findUnique({
    where: { id },
  })
}

export const createTicket = async ({ input }) => {
  var lastTicket = await db.ticket.findFirst({orderBy: [{number: 'desc'}],});
  input.number = (parseInt(lastTicket.number,10)+1).toString()
  beforeRulesArr.forEach((rule)=>{
    util.log(`Starting Before ${rule.title} ${rule.order}`)
    let previous = JSON.stringify(input)
    previous = JSON.parse(previous)
    rule.command(input);
    if(previous !== input){
      for (var prop in input){
        if(previous[prop] !== input[prop]){
        util.log(`${prop} "${previous[prop]}"=>"${input[prop]}"`)
        }
      }
    }
    util.log(`Ending Before ${rule.title}`)
  })
  let update = db.ticket.create({
    data: input,
  })
  afterRulesArr.forEach((rule)=>{
    util.log(`Starting After ${rule.title} ${rule.order}`)
    let previous = JSON.stringify(input)
    previous = JSON.parse(previous)
    rule.command(input);
    if(previous !== input){
      for (var prop in input){
        if(previous[prop] !== input[prop]){
        util.log(`${prop} "${previous[prop]}"=>"${input[prop]}"`)
        }
      }
    }
    util.log(`Ending After ${rule.title}`)
  })
  return update;
}

export const updateTicket = ({ id, input }) => {
  return db.ticket.update({
    data: input,
    where: { id },
  })
}

export const deleteTicket = ({ id }) => {
  return db.ticket.delete({
    where: { id },
  })
}

export const Ticket = {
  User: (_obj, { root }) =>
    db.ticket.findUnique({ where: { id: root.id } }).User(),
}
