import { db } from 'src/lib/db'
import rules from 'src/rules/tickets/**.{js,ts}'
let rulesArr = Object.keys(rules).map((k) => rules[k])//from obj to arr of objs
rulesArr.sort((a,b) => a.order-b.order );//order rules asc
//filter out inactive rules//tbd


export const tickets = () => {
  return db.ticket.findMany({})
}

export const ticket = ({ id }) => {
  return db.ticket.findUnique({
    where: { id },
  })
}

export const createTicket = async ({ input }) => {
  var lastTicket = await db.ticket.findFirst({orderBy: [{number: 'desc'}],});
  input.number = (parseInt(lastTicket.number,10)+1).toString()
  rulesArr.forEach((rule)=>{
    rule.command(input);
  })
  return db.ticket.create({
    data: input,
  })
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
