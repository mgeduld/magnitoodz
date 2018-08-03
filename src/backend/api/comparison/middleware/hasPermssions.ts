export const hasPermissions = (req, res, next) => {
  if (req.signedCookies.user_id === String(req.body.user_id)) {
    next()
  } else {
    res.status(401)
    next(new Error('Unauthorized'))
  }
}
