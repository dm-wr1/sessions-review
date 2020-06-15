module.exports = {
  secureRouteTracking: (allowedRoles) => {
    return async (req, res, next) => {
      const db = req.app.get('db')
      const { user } = req.session

      const logObj = { method: req.method, path: req.path }
      if (!user) {
        logObj.user_id = null
        logObj.authorized = false
      } else {
        logObj.user_id = user.id
        if (allowedRoles.includes(user.role_id)) {
          logObj.authorized = true
        } else {
          logObj.authorized = false
        }
      }

      const [existingLog] = await db.user_history.find(logObj)

      if (existingLog) {
        await db.user_history.save({
          id: existingLog.id,
          count: existingLog.count + 1,
        })
      } else {
        await db.user_history.insert(logObj)
      }

      if (!user || !allowedRoles.includes(user.role_id)) {
        res.status(500).send('Unauthorized')
      } else {
        next()
      }
    }
  },
}
