module.exports = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key] = typeof obj[key]
    return acc
  }, {})
