const getKeysAndTypes = require('./getKeysAndTypes')

module.exports = (record, queryObj) => {
  const keysAndTypes = getKeysAndTypes(record)
  let pass = true
  for (let key in keysAndTypes) {
    if (keysAndTypes[key] === 'number') {
      const availableQueries = { max: `max_${key}`, min: `min_${key}` }
      if (queryObj[key] && record[key] !== +queryObj[key]) {
        pass = false
      } else if (
        queryObj[availableQueries.max] ||
        queryObj[availableQueries.min]
      ) {
        let max
        let min
        if (queryObj.hasOwnProperty(availableQueries.max)) {
          max = +queryObj[availableQueries.max]
        } else {
          max = Infinity
        }

        if (queryObj.hasOwnProperty(availableQueries.min)) {
          min = +queryObj[availableQueries.min]
        } else {
          min = 0
        }
        if (record[key] < min || record[key] > max) {
          pass = false
        }
      }
    } else if (keysAndTypes[key] === 'string') {
      if (
        queryObj[key] &&
        record[key].toLowerCase() !== queryObj[key].toLowerCase()
      ) {
        pass = false
      }
    }
  }

  return pass
}
