export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key) => {
  const value = localStorage.getItem(key)
  return value && JSON.parse(value)
}

export const setItemInSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const getItemFromSessionStorage = (key) => {
  const value = sessionStorage.getItem(key)
  return value && JSON.parse(value)
}

export const removeItemFromSessionStorage = (key) => {
  sessionStorage.removeItem(key)
}
