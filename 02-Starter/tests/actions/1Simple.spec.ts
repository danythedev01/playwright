import { test, expect } from '@playwright/test'

test('Fill actions', async ({ page }) => {

    await page.goto('FeedBackForm.html');
    const nameField = page.getByRole('textbox', { name: 'Name (required):' })

    await nameField.fill('Alex');

    await nameField.fill('John');

    // type action is deprecated
    await nameField.type('Alex')

})

test('Check actions', async ({ page }) => {

    await page.goto('FeedBackForm.html')

    const checkBox = page.getByRole('checkbox', { name: 'I agree to the site' })

    await checkBox.check();
    await checkBox.uncheck();

    await expect(checkBox).not.toBeChecked()
})

test('Click actions', async ({ page }) => {

    await page.goto('FeedBackForm.html')

    const submitButton = page.getByRole('button', {
        name: 'Submit'
    })

    await submitButton.click()

    const saveProgressButton = page.getByRole('button', {
        name: 'Save Progress'
    })

    await saveProgressButton.click()

    const clearProgressButton = page.getByRole('button', {
        name: 'Clear Progress'
    })

    await clearProgressButton.click()
})

test('Selection actions', async ({ page }) => {

    await page.goto('FeedBackForm.html');

    const improvementInput = page.getByLabel('Areas for Improvement')

    await improvementInput.selectOption('content');

    await expect(improvementInput).toHaveValue('content')

    improvementInput.selectOption(['presentation', 'timing']);

    await expect(improvementInput).toHaveValues(['presentation', 'timing'])

})

test('Click actions - with key down', async ({ page }) => {

    await page.goto('FeedBackForm.html');

    const improvementInput = page.getByLabel('Areas for Improvement')

    const firstOption = improvementInput.getByRole('option').first();
    const secondOption = improvementInput.getByRole('option').nth(1);

    await firstOption.click();

    await expect(improvementInput).toHaveValue('content')

    await secondOption.click({
        modifiers: ['Control']
    })

    await expect(improvementInput).toHaveValues(['content', 'presentation']) 
})


