import { action, autorun, makeObservable, observable } from 'mobx'
import { LANGUAGE } from 'constants/language'
import { Service } from 'typedi'

const CONFIG_KEY = 'configs'

export interface IConfig {
  language: LANGUAGE
  theme: 'dark' | 'light'
}
@Service()
export class Config {
  static setLanguage(lng: LANGUAGE) {
    throw new Error('Method not implemented.')
  }
  language: LANGUAGE = LANGUAGE.JP
  theme: 'light' | 'dark' = 'light'

  constructor() {
    const configsLocalStore = localStorage.getItem(CONFIG_KEY)
    if (configsLocalStore) {
      const configs: IConfig = JSON.parse(Object(configsLocalStore))
      Object.assign(this, configs)
    }
    makeObservable(this, {
      language: observable,
      theme: observable,
      toggleTheme: action.bound,
      setLanguage: action.bound
    })
    autorun(() => {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(Object(this)))
    })
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark'
  }

  setLanguage(language: LANGUAGE) {
    this.language = language
  }
}
