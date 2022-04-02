import api from '../apiService'
import config from '../../config/apiConfig'
import axios from 'axios'

jest.mock('axios')//! мокаєм аксіос із node_modules

const cities = [{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }]

describe('Test API Service', () => {
  it('Success fetch cities', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: cities }))//! створюжмо фейковий запит на сервер
    await expect(api.cities()).resolves.toEqual(cities)//! даний метод викличе фейковий axios вище і порівняє результат із вказаним нами на виході
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/cities`)//! перевіяємо, з якими аргументами ми викликали даний метод
  })

  it('Fetch cities failure', async () => {
    const errMsg = 'Api Error'
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)))//! імітуємо повернення помилки із сервера
    await expect(api.cities()).rejects.toThrow(errMsg)//! викликаємо помилку зсилаючись на axios вище
  })
})