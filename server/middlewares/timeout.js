export default (req, res, next) => {
  setTimeout(() => {
    next()
  }, 2000)
}
