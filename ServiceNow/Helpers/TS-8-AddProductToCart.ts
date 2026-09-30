export async function addProductToCart(page: Page, frameSelector: string){
    //function to add product to cart
    const frame = page.frameLocator(frameSelector);
    const addToCartBtn = frame.getByRole('button', {name : 'Add to Cart'});
    await addToCartBtn.click();
    const goToServiceCatalog = frame.locator("//*[@class='caption_link_catalog' and text()='Service Catalog']");
    await goToServiceCatalog.click();
}