function escapeRegex(text: string): string { 
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
} 
export class FilterHelper { 
    constructor(private page: Page) { } 
    async searchAndClickFilterResult(
        filterText: string, 
        linkText: string) { 
            const filterField = this.page.locator('#filter'); 
            await filterField.fill(filterText); 
            await page.waitForTimeout(1000);
            const resultLink = this.page.getByRole('link', { 
                name: new RegExp(`^${escapeRegex(linkText)}`) 
    }); 
            await expect(resultLink).toBeVisible({ timeout: 10000 }); 
            await resultLink.click();  
}}



