import React from 'react';

type WorkInProgressProps = {
  text?: string
}

const WorkInProgress = ({text = 'WIP'}: WorkInProgressProps) => (
  <div className="text-muted text-center"><small>{text}</small></div>
)

export default WorkInProgress;