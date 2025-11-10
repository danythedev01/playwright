import {test} from '@playwright/test'

// npx playwright codegen

// directly open address in codegen:
// npx playwright codegen localhost:5000
test('CodeGen test',async ({page})=>{
await page.goto('http://localhost:5000/');

await page.getByText('Corporate Events').click();
await page.getByText('Wedding Planning').click();


})