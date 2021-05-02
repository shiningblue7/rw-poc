import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { matrix } from 'src/lib/roles'
import rules from 'src/rules/users/**.{js,ts}'


export const users = () => {
  //requireAuth({ role: matrix.user.read })
  return db.user.findMany({
    include: {
      Ticket: true, // Return all fields
      UserRole: true,
    },
  })
}

export const user = ({ id }) => {
  requireAuth({ role: matrix.user.read })
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  requireAuth({ role: matrix.user.create })
  let beforeCreateRulesArr = util.loadRules(rules, "before", "create")
  beforeCreateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Create Rule "${rule.title}" ${rule.order}`)
    rule.command(input, null);
    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }
    logger.info(`Ending Before Create Rule "${rule.title}"`)
  })
  let create = db.user.create({
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

export const updateUser = async ({ id, input }) => {
  requireAuth({ role: matrix.user.update })
  let previous = await db.user.findUnique({
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

  let update = await db.user.update({
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

export const deleteUser = async ({ id }) => {
  requireAuth({ role: matrix.user.delete })
  let previous = await db.user.findUnique({
    where: { id },
  })

  let beforeDeleteRulesArr = util.loadRules(rules, "before", "delete")
  beforeDeleteRulesArr.forEach((rule) => {
    logger.info(`Starting Before Delete Rule "${rule.title}" ${rule.order}`)
    logger.info(`Deleting ${JSON.stringify(previous, '', ' ')}`)
    rule.command(null, previous);//
    logger.info(`Ending   Before Delete Rule "${rule.title}"`)
  })

  let deleteUser = db.user.delete({
    where: { id },
  })
  let afterDeleteRulesArr = util.loadRules(rules, "after", "delete")
  afterDeleteRulesArr.forEach((rule) => {
    logger.info(`Starting After Delete Rule "${rule.title}" ${rule.order}`)
    rule.command(deleteUser, previous);
    logger.info(`Ending   After Delete Rule "${rule.title}"`)
  })
  return deleteUser;
}

export const User = {
  Ticket: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).Ticket(),
}
