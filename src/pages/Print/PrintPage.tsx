import React, { useState } from 'react'
import Step1 from './StepOne'
import Step2 from './StepTwo'

const PrintPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isInStepOne, setIsInStepOne] = useState(true)

  return isInStepOne ? (
    <Step1 setFile={setFile} setIsInStepOne={setIsInStepOne} />
  ) : (
    <Step2 file={file} setIsInStepOne={setIsInStepOne} />
  )
}

export default PrintPage
