import StorageService from './local-storage'

const repositories = {
  StorageService
}

export default {
  get: (name: string) => {
    // check if name is not found
    if (!repositories[name]) {
      throw new Error(`${name.toUpperCase()} Services Not Found`)
    }

    return repositories[name]
  }
}
