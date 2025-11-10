import { test, expect } from '@playwright/test';

test('Get by text practice', async ({ page }) => {

    await page.goto('FeedBackForm.html')

    const title = page.getByText('Feedback Form').first()
    await expect(title).toBeVisible()

})

test('Get by text practice - hidden elements', async ({ page }) => {
    await page.goto('FeedBackForm.html')

    const hiddenButton = page.getByText('Hidden feature')
    await expect(hiddenButton).not.toBeVisible()

    const hiddenButtonText = await hiddenButton.textContent()
    console.log(hiddenButtonText)

    const hiddenButtonWithRole = page.getByRole('button', {
        name: 'Hidden feature'
    })
    //const hiddenButtonWithRoleText = await hiddenButtonWithRole.textContent() // not working
    // console.log(hiddenButtonWithRoleText)
})

test('Get by text practice - error messages', async ({ page }) => {
    await page.goto('FeedBackForm.html')

    const emailValidationMessage = page.getByText('Invalid email format');
    await expect(emailValidationMessage).not.toBeVisible();

    await page.getByRole('textbox', {
        name: 'email'
    }).fill('john@emailcom')

    await expect(emailValidationMessage).toBeVisible();

})

