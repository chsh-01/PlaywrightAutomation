function escapeRegex(text: string): string { 
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
} 

export async function filterNavMenuSearch(
    page: Page, 
    filterText: string,
    parentCategory: string, 
    childLink: string, 
    frameSelector?: string){
    
    const filterField = page.locator('#filter'); 
    await filterField.fill(filterText); 
    
    if(frameSelector){
        const frame = await page.frameLocator(frameSelector);
        
        const parentInFrame = frame.getByText(parentCategory,{exact: true}).first();
        
        if(await parentInFrame.count()>0){
            await logInfo(`Parent category found inside iframe: ${frameSelector}`);
            
            const resultLink = page.getByRole('link', { 
                name: new RegExp(`^${escapeRegex(childLink)}`)
          
        });
            await resultLink.click();
            return;
        }
    }
      
    const parentOnPage = page.getByLabel(`${parentCategory}`).first();
    const elementText = await parentOnPage.innerText();
    await logInfo(elementText);
    
    if (await parentOnPage.count() > 0) {
    await logInfo('Parent category found on main page');

    const resultLink = page.getByRole('link', { 
                name: new RegExp(`^${escapeRegex(childLink)}`)
    }).first();

    await resultLink.click();
    return;
  }

  throw new Error(
    `Parent category "${parentCategory}" was not found on the page or iframe`
  );
}