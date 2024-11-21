const host = window.location.hostname === 'hcmutssps.vercel.app' ? '' : 'http://20.6.92.205:3000'

// const host = 'https://hcmutssps.azurewebsites.net'
// This is the backup server.
// Because the 20.6.92.205 is my VM, it costs money, so in the future, I would turn it off.

export const apiHost = `${host}/api/v1`

// Authentication
export const logInPath = '/auth/login'
export const signUpPath = '/auth/signup'
export const getStatusPath = '/auth/status'
export const spsoLogInPath = '/spso/login'
export const spsoSignUpPath = '/spso/signup'

// Location
export const locationPath = '/location'
export const allLocationPath = '/location/all'

// Printer
export const printerPath = '/printer'
export const allPrinterPath = '/printer/all'

// Printing Log
export const printingLogPath = '/printinglog'

// Configuration
export const configurationPath = '/config'
export const getTypesPath = '/filetype'

// Student path
export const studentPath = '/student'
export const studentPagePath = '/student/page'
export const getLogInTimesPath = '/getlogintimes'
export const getLogInTimesTodayPath = '/getlogintimes/today'
export const getLogInTimesYesterdayPath = '/getlogintimes/yesterday'
