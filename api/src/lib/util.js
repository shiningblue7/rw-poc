let debug = process.env.LOGDEBUG === "true"
let _log = (message, type)=>{
  if(debug){
  console[type](message);
  }
}

export const loadRules = (rules, when) => {
  let rulesArr = Object.keys(rules).map((k) => rules[k])//from obj to arr of objs
rulesArr.sort((a,b) => a.order-b.order );//order rules asc
//filter out inactive rules//tbd
rulesArr = rulesArr.filter((rule)=>{
  //remove inactive rules, and rules missing title, command, order, active
  if((
    rule.hasOwnProperty('title') &&
    rule.hasOwnProperty('order') &&
    rule.hasOwnProperty('when') &&
    rule.hasOwnProperty('command') &&
    rule.hasOwnProperty('active') &&
    rule.hasOwnProperty('file')) === false ){
    _log(`rule ${rule.file||rule.title} removed missing title,order,command,active`,'log');
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

export const log = (message) => {
  _log(message, 'log')
}
export const warn = (message) => {
  _log(message, 'warn')
}
export const error = (message) => {
  _log(message, 'error')
}