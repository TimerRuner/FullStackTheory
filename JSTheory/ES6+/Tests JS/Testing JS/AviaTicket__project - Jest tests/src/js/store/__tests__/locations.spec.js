//? параметри і методи для тестування
import locationsInstance, { Locations } from '../locations'
import { formatDate } from '../../helpers/date'
import api, { Api } from '../../services/apiService'

//? приклад результутючих данних для виконання методів
const countries = [{ code: 'UKR', name: 'Ukraine' }]
const cities = [{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }]
const airlines = [{ country_code: 'UKR', name: 'Airlines', code: 'AVIA' }]

//? метод використовується для імітації асинхронних операцій, з метою отримати
jest.mock('../../services/apiService', () => {
  const mockApi = {//! об'єкт із імітованими відповідями із сервера
    countries: jest.fn(() => Promise.resolve([{ code: 'UKR', name: 'Ukraine' }])),
    cities: jest.fn(() => Promise.resolve([{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }])),
    airlines: jest.fn(() => Promise.resolve([{ country_code: 'UKR', name: 'Airlines', code: 'AVIA' }])),
  }

  return {
    Api: jest.fn(() => mockApi)//! повертаємо фейкову відповідь сервера із необхідними данними
  }
})

const apiService = new Api()//! фейковий екземпляр класу

//! обгортка для тестів, об'єднаних га
describe('Locations store tests', () => {
  beforeEach(() => {
    //! перш ніж провести тести в дані поля екземпляра класу ми внесемо результат виконання даного метода
    locationsInstance.countries = locationsInstance.serializeCountries(countries)
    locationsInstance.cities = locationsInstance.serializeCities(cities)
  })

  it('Check that locationInstance is instance of Locations class', () => {
    expect(locationsInstance).toBeInstanceOf(Locations)//! перевірка чи є locationInstance екземпляром класу Locations
  })

  it('Success Locations instance create', () => {
    const instance = new Locations(api, { formatDate })
    expect(instance.countries).toBe(null)//! перевірка наявності і коректного відпрацювання даних в екземплярі класу
    expect(instance.shortCities).toEqual({})
    expect(instance.formatDate).toEqual(formatDate)
  })

  it('Check correct countries serialize', () => {
    const res = locationsInstance.serializeCountries(countries)
    const expectedData = {//! дані, які очікувано ми отримаємо в одиничному екземплярі
      UKR: { code: 'UKR', name: 'Ukraine' }
    }
    expect(res).toEqual(expectedData)
  })

  //! перевірка на некоректно введені дані в метод
  it('Check countries serialize with incorrect data', () => {
    const res = locationsInstance.serializeCountries(null)
    const expectedData = {}
    expect(res).toEqual(expectedData)
  })

  it('Check correct cities serialize', () => {
    const res = locationsInstance.serializeCities(cities)
    const expectedData = {
      KH: {  country_code: 'UKR', name: 'Kharkiv', code: 'KH', country_name: 'Ukraine', full_name: 'Kharkiv,Ukraine' }
    }

    expect(res).toEqual(expectedData)
  })

  it('Check correct get city name by code', () => {
    const res = locationsInstance.getCityNameByCode('KH')
    expect(res).toBe('Kharkiv')
  })

  it('Check correct init method call', () => {
    const instance = new Locations(apiService, { formatDate })//! this.api => apiService і даний клас викличе фейкове звернення до сервера і отримає нами вказані вище дані
    expect(instance.init()).resolves.toEqual([countries, cities, airlines])//! так як airlines при проходженні даного методу - змінюється, в методі serializeAirlines - ми проводитимето всі маніпуляцї із airlines через копію
  })
})