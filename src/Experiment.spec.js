import React from 'react'
import { render } from '@testing-library/react'

import { Experiment , ProviderExperiment } from './index'

const App = ({children, experiments, ...props}) => {

  return (
    <ProviderExperiment
      experimentsParams={experiments}
      {...props}
    >
      {children || (
        <>
          <Experiment name="button-ab-testing" variant="a">
            <div>
              Testing experiment A
            </div>
          </Experiment>
          <Experiment name="button-ab-testing" variant="b">
            <div>
              Testing experiment B
            </div>
          </Experiment>
        </>
      )}
    </ProviderExperiment>
  )
}

const setup = (props) => {
  return render(<App {...props}/>)
}

describe('ContextExperiment', () => {
  it('Should accept and correctly render experiments', () => {
    const { queryByText } = setup({
      experiments: {'button-ab-testing' : 'a'}
    })
    expect(queryByText(/Testing experiment A/)).toBeInTheDocument()
    expect(queryByText(/Testing experiment B/)).not.toBeInTheDocument()
  })

  it('Should not render any experiment if the experiments doesnt have any active', () => {
    const { queryByText } = setup({
      experiments: {'other-ab-testing' : 'a'}
    })

    expect(queryByText(/Testing experiment A/)).not.toBeInTheDocument()
    expect(queryByText(/Testing experiment B/)).not.toBeInTheDocument()
  })


  it('Should not render any experiment if the children doesnt correspond to experiments', () => {
    const Children = () => (
      <>
        <Experiment name="other-ab-testing" variant="a">
          <div>
            Testing experiment A
          </div>
        </Experiment>
        <Experiment name="other-ab-testing" variant="b">
          <div>
            Testing experiment B
          </div>
        </Experiment>
      </>
    )

    const { queryByText } = setup({
      experiments: {'button-ab-testing' : 'a'},
      children: <Children/>
    })

    expect(queryByText(/Testing experiment A/)).not.toBeInTheDocument()
    expect(queryByText(/Testing experiment B/)).not.toBeInTheDocument()
  })


  it('Should not render children withou experiments', () => {
    const { queryByText } = setup()
    expect(queryByText(/AB Testing experiment/)).not.toBeInTheDocument()
  })
})
