import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PrintingState {
  value: {
    file: string
    isInStepOne: boolean
    history: PrintingLog[]
  }
}

const printing = createSlice({
  name: 'printing',
  initialState: {
    value: {
      file: '',
      isInStepOne: true,
      history: []
    }
  },
  reducers: {
    setFileReducer: (state: PrintingState, action: PayloadAction<string>) => {
      state.value.file = action.payload
      state.value.isInStepOne = false
    },
    removeFileReducer: (state) => {
      state.value.file = ''
      state.value.isInStepOne = true
    },
    getFileHistoryReducer: (state: PrintingState, action: PayloadAction<PrintingLog[]>) => {
      state.value.history = action.payload
    },
    deleteFileHistoryReducer: (state: PrintingState) => {
      state.value.history = []
    }
  }
})

export const { setFileReducer, removeFileReducer, getFileHistoryReducer, deleteFileHistoryReducer } = printing.actions

export default printing.reducer