describe('Form', () => {
  it('When visiting the home page, the form is visible', () => {
    cy.visit('http://localhost:9000/')//! хочемо відвідати певний додаток
    cy.get('[data-hook=mainForm]').should('be.visible')
  })

  it('When typing a value into origin city autocomplete, this autocomplete is visible and has typed value', () => {
    cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')//? переназиваємо наш елемент для зручнішого використання в тесті

    cy.get('@autocompleteOrigin').should('be.visible')
    cy.get('@autocompleteOrigin').type('Харьков')//! вводимо дані, які хочемо ввести в цей елемент
    cy.get('@autocompleteOrigin').should('have.value', 'Харьков')//! превіряємо, що дані введені в поле такі, як ми вказали
  })

  it('When typing a value into destination city autocomplete, this autocomplete is visible and has typed value', () => {
    cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')

    cy.get('@autocompleteDestination').should('be.visible')
    cy.get('@autocompleteDestination').type('Киев')
    cy.get('@autocompleteDestination').should('have.value', 'Киев')
  })

  it('When clicking on the depart datepicker the datepicker modal should opens', () => {
    cy.get('[data-hook=datePickerDepartInput]').as('datePickerDepartInput')
    cy.get('[data-hook=datePickerDepartWrap] .datepicker-container').as('modalWindow')//! контейнер модального вікна

    cy.get('@datePickerDepartInput').click()
    cy.get('@modalWindow').should('be.visible')
  })

  it('After selecting the departing date, it should be displayed in the input field in the right format', () => {
    cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .is-today').as('today')//! кнопка зі числом, сьогоднішньої дати
    cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .btn-flat').as('modalButtons')//! отримуємо усі кнопки модального вікна із цим класом
    cy.get('[data-hook=datePickerDepartInput]').as('datePickerDepartInput')//? поле для вводу дати в розмітці

    cy.get('@today').click()
    cy.get('@today').should('have.class', 'is-selected')
    cy.get('@modalButtons').contains('Ok').click()//! нажимаємо на кнопку із контентом OK

    //! перевірка значення в інпуті із датою на коректність введення, так як дата кожного дня мінятиметься
    cy.get('@datePickerDepartInput').then(($input) => {
      const val = $input.val()//! отримуємо значення даного поля
      // 2020-11
      expect(val).to.match(/^\d{4}-\d{2}$/)//! перевіряємо, що наше значення записане в праильному форматі за регулярним виразом
    })
  })

  it('When selecting the currency from the header dropdown it should be changed and visible in the header', () => {
    cy.get('[data-hook=currencySelect] .dropdown-trigger').as('currencyTrigger')//? отримуємо селект
    cy.get('[data-hook=currencySelect] .dropdown-content li').as('currencyItem')//? вибираємо елементи із варіантами 

    cy.get('@currencyTrigger').click()
    cy.get('@currencyItem').contains('€ Euro').click()
    cy.get('@currencyTrigger').should('have.value', '€ Euro')
  })
})