import './dbc/mainWindow'
import './dbc/store'
import './dbc/env'
declare global {
  interface Window {
    DBC: {
      mainWindow?: any
      store?: any
      env?: {
        DBC_VERSION: string
        DBC_APP_PATH: string
        DBC_STATIC_PATH: string
        DBC_HOME_PATH: string
        DBC_NODE_PATH: string
        DBC_NPM_PATH: string
      }
    }
  }
}
