describe("проверка кнопки добавления - стек", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/stack");
    });

    it("кнопка добавления находится в состоянии disabled при пустом input", () => {
        cy.get("input").clear();
        cy.get("button").eq(1).should("be.disabled");
    });

    it("добавление элемента выполняется корректно", () => {
        cy.get("input").type("1");
        cy.get("button").eq(1).click();
        const numbers = [1, 3, 5, 7];

        cy.get("[class*=circle_content]")
            .should("have.length", 1)
            .each((el, index) => {
                cy.wrap(el).contains(numbers[index]);
            });

        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_changing]");
        cy.wait(1000);
        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_default]");

        cy.get("input").type("3");
        cy.get("button").eq(1).click();

        cy.get("[class*=circle_content]")
            .should("have.length", 2)
            .each((el, index) => {
                cy.wrap(el).contains(numbers[index]);
            });
        cy.get("[class*=circle_content]").eq(1).find("[class*=circle_changing]");
        cy.wait(1000);
        cy.get("[class*=circle_content]").eq(1).find("[class*=circle_default]");

        cy.get("input").type("5");
        cy.get("button").eq(1).click();

        cy.get("[class*=circle_content]")
            .should("have.length", 3)
            .each((el, index) => {
                cy.wrap(el).contains(numbers[index]);
            });
        cy.get("[class*=circle_content]").eq(2).find("[class*=circle_changing]");
        cy.wait(1000);
        cy.get("[class*=circle_content]").eq(2).find("[class*=circle_default]");

        cy.get("input").type("7");
        cy.get("button").eq(1).click();

        cy.get("[class*=circle_content]")
            .should("have.length", 4)
            .each((el, index) => {
                cy.wrap(el).contains(numbers[index]);
            });
        cy.get("[class*=circle_content]").eq(3).find("[class*=circle_changing]");
        cy.wait(1000);
        cy.get("[class*=circle_content]").eq(3).find("[class*=circle_default]");
    });

    it("удаление элемента происходит корректно", () => {
        cy.get("input").type("7");
        cy.get("button").eq(1).click();
        cy.get("button").eq(2).click();

        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_changing]");
        cy.wait(1000);
        cy.get("[class*=circle_content]").should("not.exist");
    });

    it("кнопка очистить работает верно", () => {
        cy.get("input").type("7");
        cy.get("button").eq(1).click();
        cy.wait(1000);
        cy.get("input").type("8");
        cy.get("button").eq(1).click();
        cy.wait(1000);
        cy.get("input").type("9");
        cy.get("button").eq(1).click();
        cy.wait(1000);
        cy.get("button").eq(3).click();
        cy.get("[class*=circle_content]").should("not.exist");
    });
});