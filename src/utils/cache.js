export const getItem = key => {
  return JSON.parse(sessionStorage.getItem(key) || null)
}

export const setItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const removeItem = key => {
  sessionStorage.removeItem(key)
}
export const cleatCache = () => {
  sessionStorage.clear()
}
