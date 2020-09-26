export default interface DBCNotification {
  type: 'info' | 'success' | 'error' | 'alert'
  message: string
}
