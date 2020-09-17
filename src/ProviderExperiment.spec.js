import React from 'react'
import { render } from '@testing-library/react'

import { ProviderExperiment} from './index'

const App = ({children, experiments, ...props}) => {
  const defaultExperiments = {'button-ab-testing' : 'a'}

  return (
    <ProviderExperiment
      experimentsParams={experiments === null || experiments || defaultExperiments}
      {...props}
    >
      {children}
    </ProviderExperiment>
  )
}

const setup = (props) => {
  return render(<App {...props}/>)
}

describe('ContextExperiment', () => {
  it('Should render correctly with internal children', () => {
    const { getByText } = setup({ children: 'AB Testing experiment' })
    expect(getByText(/AB Testing experiment/)).toBeInTheDocument()
  })
  it('Should render correctly with internal children', () => {
    const { queryByText } = setup()
    expect(queryByText(/AB Testing experiment/)).not.toBeInTheDocument()
  })
})
