import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import ContextExperiment from './ContextExperiment'

const verifyExperimentExist = (experiments, name) => (
  Object.keys(experiments).find(experiment => experiment === name)
)

const Experiment = ({
  variant,
  name,
  children
}) => {
  
  return (
    <ContextExperiment.Consumer>
      {context => {
        // const context = useContext(ContextExperiment)
        const experiments = context.experiments
      
        // Verify if Experiment exist
        const experimentActive = verifyExperimentExist(experiments, name)
        if (!experimentActive) return false;
      
        // Verify if test is active
        if (variant !== experiments[experimentActive]) return false;

        return children
      }
      }
    </ContextExperiment.Consumer>
  )
}

export default Experiment;

Experiment.propTypes = {
  variant: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
    PropTypes.object
  ]),
}
