describe("проверка кнопки добавления - очередь", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/queue");
    });
    it("кнопка добавления находится в состоянии disabled при пустом input", () => {
        cy.get("input").clear();
        cy.get("button").eq(1).should("be.disabled");
    });

    it("добавление работает, head и tail выставляются верно", () => {
        cy.get("input").type("1");
        cy.get("button").eq(1).click();

        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_changing]");

        cy.wait(500);

        cy.get("[class*=circle_content]").eq(0).contains("1");
        cy.get("[class*=circle_content]").eq(0).contains("head");
        cy.get("[class*=circle_content]").eq(0).contains("tail");
        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_default]");

        cy.get("input").type("22");
        cy.get("button").eq(1).click();

        cy.get("[class*=circle_content]").eq(1).find("[class*=circle_changing]");
        cy.get("[class*=circle_content]").eq(1).contains("tail");
        cy.get("[class*=circle_content]")
            .eq(0)
            .contains("tail")
            .should("not.exist");
        cy.get("[class*=circle_content]").eq(0).contains("head");

        cy.wait(500);

        cy.get("[class*=circle_content]").eq(1).find("[class*=circle_default]");
        cy.get("[class*=circle_content]").eq(1).contains("22");

        cy.get("input").type("77");
        cy.get("button").eq(1).click();

        cy.get("[class*=circle_content]").eq(2).find("[class*=circle_changing]");
        cy.get("[class*=circle_content]").eq(2).contains("tail");
        cy.get("[class*=circle_content]")
            .eq(1)
            .contains("tail")
            .should("not.exist");
        cy.get("[class*=circle_content]").eq(0).contains("head");

        cy.wait(500);

        cy.get("[class*=circle_content]").eq(2).find("[class*=circle_default]");
        cy.get("[class*=circle_content]").eq(2).contains("77");
    });

    it("удаление работает корректно", () => {
        cy.get("input").type("1");
        cy.get("button").eq(1).click();

        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_changing]");

        cy.wait(500);

        cy.get("[class*=circle_content]").eq(0).contains("1");
        cy.get("[class*=circle_content]").eq(0).contains("head");
        cy.get("[class*=circle_content]").eq(0).contains("tail");
        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_default]");

        cy.get("input").type("22");
        cy.get("button").eq(1).click();

        cy.get("[class*=circle_content]").eq(1).find("[class*=circle_changing]");
        cy.get("[class*=circle_content]").eq(1).contains("tail");
        cy.get("[class*=circle_content]")
            .eq(0)
            .contains("tail")
            .should("not.exist");
        cy.get("[class*=circle_content]").eq(0).contains("head");

        cy.wait(500);

        cy.get("[class*=circle_content]").eq(1).find("[class*=circle_default]");
        cy.get("[class*=circle_content]").eq(1).contains("22");

        cy.get("button").eq(2).click();
        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_changing]");
        cy.get("[class*=circle_content]")
            .eq(0)
            .contains("head")
            .should("not.exist");
        cy.get("[class*=circle_content]").eq(1).contains("head");

        cy.wait(500);

        cy.get("[class*=circle_content]").eq(0).contains("1").should("not.exist");
        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_default]");
    });

    it("кнопка очистить работает корректно", () => {
        cy.get("input").type("7");
        cy.get("button").eq(1).click();
        cy.wait(500);
        cy.get("input").type("8");
        cy.get("button").eq(1).click();
        cy.wait(500);
        cy.get("input").type("9");
        cy.get("button").eq(1).click();
        cy.wait(500);
        cy.get("button").eq(3).click();

        cy.get("[class*=circle_content]").eq(0).contains("7").should("not.exist");
        cy.get("[class*=circle_content]").eq(1).contains("8").should("not.exist");
        cy.get("[class*=circle_content]").eq(2).contains("9").should("not.exist");
    });
});