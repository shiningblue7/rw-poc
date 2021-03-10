import { render } from '@redwoodjs/testing'

import TestPage from './TestPage'

describe('TestPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TestPage />)
    }).not.toThrow()
  })
})
