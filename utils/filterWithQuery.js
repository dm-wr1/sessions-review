const parseQuery = require('./parseQuery')

module.exports = (arr, queries) => {
  return arr.filter((record) => parseQuery(record, queries))
}
