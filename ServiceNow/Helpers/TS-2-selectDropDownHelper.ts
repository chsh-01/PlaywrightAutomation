export async function selectDropDownValueByIndex(page: Page, dropdownLocator: string, indexVal: number, frameSelector?: string)
    {
    const frame = page.frameLocator(frameSelector);
    const dropdown = frame.locator(dropdownLocator);
    await dropdown.selectOption({index: indexVal});
    const selectedValue = await dropdown.inputValue();
    await logInfo(`Selected value: ${selectedValue}`);
}

export async function selectDropDownValueByValue(
    page: Page,  
    dropdownLocator: string, 
    val: string,
    frameSelector?: string,)
    {
    const frame = page.frameLocator(frameSelector);
    const dropdown = frame.locator(dropdownLocator);
    await dropdown.selectOption({value: val});
    const selectedValue = await dropdown.inputValue();
    await logInfo(`Selected value: ${selectedValue}`);
}