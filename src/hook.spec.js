import React from 'react'
import { render } from '@testing-library/react'

import { Experiment , ProviderExperiment, useEmitter} from './index'

const setup = ({children, experiments, ...props}) => {
  const methodParamsHandler = jest.fn()

  const utils = render(
    <ProviderExperiment
      experimentsParams={experiments}
      methodParams={methodParamsHandler}
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

  return {
    ...utils,
    methodParamsHandler
  }
}

describe('ContextExperiment', () => {
  it('Should correctly send callback method', () => {
    const Component = () => {
      const { execute } = useEmitter('button-ab-testing', 'Method B clicked')
      execute()
      return null
    }

    const { methodParamsHandler } = setup({
      experiments: {'button-ab-testing' : 'a'},
      children: <Component/>
    })

    expect(methodParamsHandler).toHaveBeenCalledTimes(1)
    expect(methodParamsHandler).toHaveBeenCalledWith('button-ab-testing', 'a', "Method B clicked")
  })

  it('Should correctly send callback method for each emitter defined', () => {
    const Component = () => {
      const { execute: executeA } = useEmitter('button-ab-testing', 'Method B clicked')
      const { execute: executeB } = useEmitter('button-ab-testing', 'Method A clicked')
      executeA()
      executeB()
      
      return null
    }

    const { methodParamsHandler } = setup({
      experiments: {'button-ab-testing' : 'a'},
      children: <Component/>
    })

    expect(methodParamsHandler).toHaveBeenCalledTimes(2)
    expect(methodParamsHandler).toHaveBeenCalledTimes(2)
  })

  it('Should not execute emitter when corresponding tag doesnt found a match experiment', () => {
    const Component = () => {
      const { execute } = useEmitter('button-abc-testing', 'Method B clicked')
      execute()
      return null
    }

    const { methodParamsHandler } = setup({
      experiments: {'button-ab-testing' : 'a'},
      children: <Component/>
    })

    expect(methodParamsHandler).not.toHaveBeenCalled()
  })

  it('Should not execute emitter when corresponding tag doesnt found a match experiment', () => {
    const Component = () => {
      const { execute } = useEmitter('button-abc-testing', 'Method B clicked')
      execute()
      return null
    }

    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});
  
    expect(() => {
      render(<Component/>)
    }).toThrow('could not find react-experiment context value; please ensure the component is wrapped in a <Provider>');  
    
    console.error.mockRestore();
  })
})
