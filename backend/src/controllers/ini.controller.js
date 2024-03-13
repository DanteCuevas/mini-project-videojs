
const ini = async (req, res) => {
  try {
    return res.json({success: true, message: 'server okey'})
  } catch (error) {
    return res.status(500).end()
  }
}

module.exports = {
  ini
}
