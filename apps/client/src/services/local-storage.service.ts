export class LocalStorageService {
  static setWithExpiry(key: string, value: string) {
    const now = new Date()

    const item = {
      value: value,
      expiry: now.getTime() + 60 * 60 * 24,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  static getWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }
}
