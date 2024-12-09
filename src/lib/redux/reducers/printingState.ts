import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PrintingState {
  value: {
    file: string
    isInStepOne: boolean
    history: PrintingLog[]
    openModal: boolean
    nPage: number
    printSz: string
    printLocation: string
    dblSided: string
    warning: boolean
    warningMsg: string
    currentBalance: number
  }
}

// Define the initial state separately for easy reuse
const initialStateValue = {
  file: '',
  isInStepOne: true,
  history: [] as PrintingLog[],
  openModal: false,
  nPage: 0,
  printSz: 'none',
  printLocation: 'none',
  dblSided: 'none',
  warning: false,
  warningMsg: 'none',
  currentBalance: 0
}

const printing = createSlice({
  name: 'printing',
  initialState: {
    value: initialStateValue
  },
  reducers: {
    setFileReducer: (state: PrintingState, action: PayloadAction<string>) => {
      state.value.file = action.payload
      state.value.isInStepOne = false
    },
    removeFileReducer: (state) => {
      // Reset only printing-related properties
      state.value.file = initialStateValue.file
      state.value.isInStepOne = initialStateValue.isInStepOne
      state.value.openModal = initialStateValue.openModal
      state.value.nPage = initialStateValue.nPage
      state.value.printSz = initialStateValue.printSz
      state.value.printLocation = initialStateValue.printLocation
      state.value.dblSided = initialStateValue.dblSided
      state.value.warning = initialStateValue.warning
      state.value.warningMsg = initialStateValue.warningMsg
      state.value.currentBalance = initialStateValue.currentBalance
      // Preserve history
      // state.value.history remains unchanged
    },
    getFileHistoryReducer: (state: PrintingState, action: PayloadAction<PrintingLog[]>) => {
      state.value.history = action.payload
    },
    deleteFileHistoryReducer: (state: PrintingState) => {
      state.value.history = []
    },
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.value.openModal = action.payload
    },
    setNPage: (state, action: PayloadAction<number>) => {
      state.value.nPage = action.payload
    },
    setPrintSz: (state, action: PayloadAction<string>) => {
      state.value.printSz = action.payload
    },
    setPrintLocation: (state, action: PayloadAction<string>) => {
      state.value.printLocation = action.payload
    },
    setDblSided: (state, action: PayloadAction<string>) => {
      state.value.dblSided = action.payload
    },
    setWarning: (state, action: PayloadAction<{ warning: boolean; warningMsg: string }>) => {
      state.value.warning = action.payload.warning
      state.value.warningMsg = action.payload.warningMsg
    },
    setCurrentBalance: (state, action: PayloadAction<number>) => {
      state.value.currentBalance = action.payload
    },
    addFileHistoryReducer: (state, action: PayloadAction<PrintingLog>) => {
      state.value.history = [action.payload, ...state.value.history]
    }
  }
})

export const {
  setFileReducer,
  removeFileReducer,
  getFileHistoryReducer,
  deleteFileHistoryReducer,
  setOpenModal,
  setNPage,
  setPrintSz,
  setPrintLocation,
  setDblSided,
  setWarning,
  setCurrentBalance,
  addFileHistoryReducer
} = printing.actions

export default printing.reducer
