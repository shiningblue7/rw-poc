import { cmdbs, cmdb, createCmdb, updateCmdb, deleteCmdb } from './cmdbs'

describe('cmdbs', () => {
  scenario('returns all cmdbs', async (scenario) => {
    const result = await cmdbs()

    expect(result.length).toEqual(Object.keys(scenario.cmdb).length)
  })

  scenario('returns a single cmdb', async (scenario) => {
    const result = await cmdb({ id: scenario.cmdb.one.id })

    expect(result).toEqual(scenario.cmdb.one)
  })

  scenario('creates a cmdb', async (scenario) => {
    const result = await createCmdb({
      input: { number: 'String8701837' },
    })

    expect(result.number).toEqual('String8701837')
  })

  scenario('updates a cmdb', async (scenario) => {
    const original = await cmdb({ id: scenario.cmdb.one.id })
    const result = await updateCmdb({
      id: original.id,
      input: { number: 'String79360692' },
    })

    expect(result.number).toEqual('String79360692')
  })

  scenario('deletes a cmdb', async (scenario) => {
    const original = await deleteCmdb({ id: scenario.cmdb.one.id })
    const result = await cmdb({ id: original.id })

    expect(result).toEqual(null)
  })
})
