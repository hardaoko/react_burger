context("Работа конструктора и оформление заказа", () => {
  it("Модальное окно с информацией об ингредиентах", () => {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    cy.get('[data-at="ingredients"]').first().click();
    cy.wait(1000);
    cy.contains("Детали ингредиента").should("exist");
    cy.get('[data-at="close-button"]').click();
  });

  it("Перенос ингредиентов в конструктор и оформление заказа", () => {
    cy.wait(1000);
    cy.get('[data-at="ingredients"]').first().trigger("dragstart");
    cy.get('[data-at="constructor"]').trigger("drop");
    cy.get('[data-at="ingredients"]').contains("Говяжий").trigger("dragstart");
    cy.get('[data-at="constructor"]').trigger("drop");
    cy.get('[data-at="ingredients"]').contains("Сыр").trigger("dragstart");
    cy.get('[data-at="constructor"]').trigger("drop");
    cy.get('[data-at="ingredients"]').contains("Мини").trigger("dragstart");
    cy.get('[data-at="constructor"]').trigger("drop");
    cy.get('[data-at="ingredients"]').contains("Соус").trigger("dragstart");
    cy.get('[data-at="constructor"]').trigger("drop");
    cy.get('[data-at="constructor"]').contains("Краторная").should("exist");

    cy.get("button").contains("Оформить заказ").click();
  });

  it("Авторизация проходит успешно", () => {
    cy.get('[name="email"]').focus().type("ptrpochta@yan.ru");
    cy.get('[name="password"]').type("1234567");
    cy.get('[name="button"]').click();
    cy.get('[data-at="main-title"]').should("exist");
    cy.get("button").contains("Оформить заказ").click();
    cy.wait(16000);
    cy.contains("идентификатор заказа").should("exist");
  });
});
