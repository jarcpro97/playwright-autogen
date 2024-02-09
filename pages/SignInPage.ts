import { expect, type Page } from "@playwright/test";

export class SignInPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("https://viajes.com/vuelos");
  }
  async signIn() {
    await this.page
      .getByRole("complementary")
      .getByText("Iniciar sesión")
      .click();
    await this.page.getByPlaceholder("Número de documento").click();
    await this.page.getByPlaceholder("Número de documento").fill("343423");
    await this.page
      .frameLocator('iframe[name="a-kkxjgu7vrzaw"]')
      .getByLabel("No soy un robot")
      .click();
    await this.page.getByRole("button", { name: "Iniciar sesión" }).click();
  }
  async isSignedIn() {
    await expect(this.page.getByRole("strong")).toContainText(
      "Ingresa tu clave dinámica",
    );
  }
}
