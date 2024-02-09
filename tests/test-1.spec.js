"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('Sign in', async ({ page }) => {
    // PageClass: SignInPage
    // Action: visit
    await page.goto('https://viajes.puntoscolombia.com/vuelos');
    // Action: signIn
    await page.getByRole('complementary').getByText('Iniciar sesión').click();
    await page.getByPlaceholder('Número de documento').click();
    await page.getByPlaceholder('Número de documento').fill('1010234331');
    await page.frameLocator('iframe[name="a-kkxjgu7vrzaw"]').getByLabel('No soy un robot').click();
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    // Action: isSignedIn
    await (0, test_1.expect)(page.getByRole('strong')).toContainText('Ingresa tu clave dinámica');
});
