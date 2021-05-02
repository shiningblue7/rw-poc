
export const matrix = {
  ticket:   {
    create: ['task_doer', 'task_admin',                                            'admin'],
    read:   ['task_doer', 'task_admin', 'asset_doer', 'asset_admin',               'admin'],
    update: ['task_doer', 'task_admin',                                            'admin'],
    delete: [             'task_admin',                                            'admin']
  },
  asset: {
    create: [                           'asset_doer', 'asset_admin',               'admin'],
    read:   [                           'asset_doer', 'asset_admin',               'admin'],
    update: [                           'asset_doer', 'asset_admin',               'admin'],
    delete: [                                         'asset_admin',               'admin']
  },
  user: {
    create: [                                                        'user_admin', 'admin'],
    read:   ['task_doer', 'task_admin', 'asset_doer', 'asset_admin', 'user_admin', 'admin'],
    update: [                                                        'user_admin', 'admin'],
    delete: [                                                        'user_admin', 'admin']
  },
  userRole: {
    create: [                                                        'user_admin', 'admin'],
    read:   ['task_doer', 'task_admin', 'asset_doer', 'asset_admin', 'user_admin', 'admin'],
    update: [                                                        'user_admin', 'admin'],
    delete: [                                                        'user_admin', 'admin']
  }
}