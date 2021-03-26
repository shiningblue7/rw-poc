import { logger } from 'src/lib/logger'
export const loadRules = (rules, when) => {
  let rulesArr = Object.keys(rules).map((k) => rules[k])//from obj to arr of objs
rulesArr.sort((a,b) => a.order-b.order );//order rules asc
rulesArr = rulesArr.filter((rule)=>{
  if((//remove inactive rules, and rules missing title, command, order, active
    rule.hasOwnProperty('title') &&
    rule.hasOwnProperty('order') &&
    rule.hasOwnProperty('when') &&
    rule.hasOwnProperty('command') &&
    rule.hasOwnProperty('active') &&
    rule.hasOwnProperty('file')) === false ){
    logger.info(`rule ${rule.file||rule.title} removed missing title,order,command,active`,'log');
    return false
  }
  return rule.active === true
})
rulesArr = rulesArr.filter((rule)=>{
  if(rule.when == when){
    return true;
  } else {
    return false;
  }
})
return rulesArr;
}