import React from 'react'
import Step1 from './StepOne'
import Step2 from './StepTwo'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'

const PrintPage: React.FC = () => {
  // const [file, setFile] = useState<File | null>(null)
  // const [isInStepOne, setIsInStepOne] = useState(true)
  const printingState = useSelector((state: RootState) => state.printingState.value)

  return printingState.isInStepOne ? <Step1 /> : <Step2 />
}

export default PrintPage
