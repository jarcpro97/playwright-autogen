import { test, expect } from '@playwright/test';

test('Sign in', async ({ page }) => {
  // PageClass: SignIn
  // Action: visit
  await page.goto('https://viajes.com/vuelos');
  // Action: signIn
  await page.getByRole('complementary').getByText('Iniciar sesión').click();
  await page.getByPlaceholder('Número de documento').click();
  await page.getByPlaceholder('Número de documento').fill('137382244');
  await page.frameLocator('iframe[name="a-kkxjgu7vrzaw"]').getByLabel('No soy un robot').click();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  // Action: isSignedIn
  await expect(page.getByRole('strong')).toContainText('Ingresa tu clave dinámica');
  // end
});