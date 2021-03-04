import { db } from 'src/lib/db'
import * as fs from 'fs'
//import { runRules } from 'src/lib/rules/insert';
import rules from 'src/rules/tickets/**.{js,ts}'
console.log(`rules`, rules);
let rulesArr = Object.keys(rules).map((k) => rules[k])//from obj to arr of objs
rulesArr.sort((a,b) => a.order-b.order );//order rules asc
//filter out inactive rules
console.log(`rulesArr`, rulesArr);


export const tickets = () => {
  return db.ticket.findMany({})
}

export const ticket = ({ id }) => {
  return db.ticket.findUnique({
    where: { id },
  })
}

export const lastTicket = () => {
  return db.ticket.findFirst({
    orderBy: [{
      number: 'desc'
    }],
  })
}

export const createTicket = async ({ input }) => {
  var lastTicket = await db.ticket.findFirst({orderBy: [{number: 'desc'}],});
  input.number = (parseInt(lastTicket.number,10)+1).toString()
  var modifiedInput;
  rulesArr.forEach((rule)=>{
    console.log('running', rule, input)
    modifiedInput = rule.command(input);
    console.log('ran', rule, input)
  })
  //var modifiedInput = await runRules(input, 'tickets');
  console.log(`modifiedInput ${JSON.stringify(modifiedInput)}`)
  return db.ticket.create({
    //data: modifiedInput,// input,
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
