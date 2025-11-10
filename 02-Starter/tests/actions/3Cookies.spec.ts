import { test, expect } from '@playwright/test'

test('Saving cookies - user actions - accept cookies', async ({ page }) => {

    await page.goto('');

    const acceptCookiesButton = page.getByRole('button', {
        name: 'Accept'
    })

    await acceptCookiesButton.click();

    // assert that the cookie banner is not visible:
    const cookieBanner = acceptCookiesButton.locator('..')
    await expect(cookieBanner).not.toBeVisible()
})

test('Saving cookies - user actions - reject', async ({ page }) => {

    await page.goto('');

    const declineCookiesButton = page.getByRole('button', {
        name: 'Decline'
    })

    await declineCookiesButton.click();

    // assert that the cookie banner is not visible:
    const cookieBanner = declineCookiesButton.locator('..')
    await expect(cookieBanner).not.toBeVisible()

    await page.reload();

    await expect(cookieBanner).toBeVisible()
})

test('Handle cookies inside test', async ({ page }) => {

    await page.goto('');

    await page.context().addCookies([{
        url: page.url(),
        name: 'cookieConsent',
        value: 'accepted'
    }])

    await page.reload()

    const cookieBanner = page.locator('#cookie-banner')
    await expect(cookieBanner).not.toBeVisible()

})