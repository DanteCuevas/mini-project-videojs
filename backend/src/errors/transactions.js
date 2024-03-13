class TransactionDBError extends Error {
  constructor (message) {
    super(message)
    this.name = 'TransactionDBError'
  }
}

class ValidateError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidateError'
  }
}

module.exports = {
  TransactionDBError,
  ValidateError
}
