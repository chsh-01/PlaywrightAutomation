import { leapwork } from "./leapwork";

import { ServiceNowLoginToServiceNow } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LoginToServiceNow";
import { assertHeadingInPages } from "@assets/ServiceNow/Helpers/HeadingTextHelper";
import { addProductToCart } from "@assets/ServiceNow/Helpers/AddProductToCart";
import { ServiceNowLogOut } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LogOut";
import { filterNavMenuSearch } from "@assets/ServiceNow/Helpers/filterNavMenuSearch";

declare const require: (name: string) => any;
const xlsxFile = leapwork.files.path("FL-1");

leapwork.configuration({
  enableSelfHeal: false,
  timeoutMs: 15000
});

// ai-studio-step-id: ffdfa264
await leapwork.step("Use test case: ServiceNow_LoginToServiceNow", async () => {
    return await ServiceNowLoginToServiceNow();
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: c11146e3
await leapwork.step("Use TypeScript asset: filterNavMenuSearch", async () => {
    await filterNavMenuSearch(page, "Service Catalog", "Self-Service","Service Catalog");
}, { action: "asset_reference" });

// ai-studio-step-id: pw1c9l43w0
await leapwork.step("Use TypeScript asset: AddProductToCart", async () => {
    return await AddProductToCart();
}, { action: "asset_reference" });

// ai-studio-step-id: L5p4L6XS
await leapwork.step("Validate the ServiceNow Catalog page heading shows \"Service Catalog\"", async () => {
    await page.waitForTimeout(10000);
    await assertHeadingInPages(page,'#gsft_main',"Service Catalog");
}, { action: "validate", relativeXpath: ".//table/tbody/tr/td[1]/div/span" });

// ai-studio-step-id: ZfoJEiwr
await leapwork.step("Validate that the ServiceNow Catalog page shows a “Services” link", async () => {
    // Assert link "Services" contains "Services"
    await expect(page.getByRole('link', { name: 'Services', exact: true })).toContainText("Services");
}, { action: "validate", relativeXpath: "//*[@id=\"com.glideapp.servicecatalog.RenderCategory_0178583392391701_header\"]/a" });

// ai-studio-step-id: 9IGiH5NN
await leapwork.step("Validate the ServiceNow Catalog page shows the “Hardware” category.", async () => {
    // Assert link "Hardware" contains "Hardware"
    await expect(page.getByRole('link', { name: 'Hardware', exact: true })).toContainText("Hardware");
}, { action: "validate", relativeXpath: "//*[@id=\"com.glideapp.servicecatalog.RenderCategory_0178583392393405_header\"]/a" });

// ai-studio-step-id: W8QyspCQ
await leapwork.step("Validate the ServiceNow Catalog page shows the “Office” category.", async () => {
    // Assert link "Office" contains "Office"
    await expect(page.getByRole('link', { name: 'Office', exact: true })).toContainText("Office");
}, { action: "validate", relativeXpath: "//*[@id=\"com.glideapp.servicecatalog.RenderCategory_0178583392392402_header\"]/a" });

// ai-studio-step-id: qiU6Uncp
await leapwork.step("Validate the Catalog page's Software category link shows \"Software\"", async () => {
    // Assert link "Software" contains "Software"
    await expect(page.getByRole('link', { name: 'Software', exact: true })).toContainText("Software");
}, { action: "validate", relativeXpath: "//*[@id=\"com.glideapp.servicecatalog.RenderCategory_0178583392393706_header\"]/a" });

// ai-studio-step-id: iDKobBGP
await leapwork.step("Validate the Catalog page shows the “Peripherals” category link.", async () => {
    // Assert link "Peripherals" contains "Peripherals"
    await expect(page.getByRole('link', { name: 'Peripherals', exact: true })).toContainText("Peripherals");
}, { action: "validate", relativeXpath: "//*[@id=\"com.glideapp.servicecatalog.RenderCategory_0178583392392703_header\"]/a" });

// ai-studio-step-id: lxhioH2k
await leapwork.step("Validate the Catalog page shows a “Desktops” category link", async () => {
    // Assert link "Desktops" contains "Desktops"
    await expect(page.getByRole('link', { name: 'Desktops', exact: true })).toContainText("Desktops");
}, { action: "validate", relativeXpath: "//*[@id=\"com.glideapp.servicecatalog.RenderCategory_0178583392394007_header\"]/a" });

// ai-studio-step-id: Q7RePfni
await leapwork.step("Validate that the ServiceNow Catalog page shows the “Mobiles” category link.", async () => {
    // Assert link "Mobiles" contains "Mobiles"
    await expect(page.getByRole('link', { name: 'Mobiles', exact: true })).toContainText("Mobiles");
}, { action: "validate", relativeXpath: "//*[@id=\"com.glideapp.servicecatalog.RenderCategory_0178583392394408_header\"]/a" });

// ai-studio-step-id: pwp79lff00
await leapwork.step("Read Category and Product Name from Excel and Add product to cart", async () => {
    const XLSX = require("xlsx");
    const workbook = XLSX.readFile(xlsxFile);
    const sheetName = workbook.SheetNames[1];
    const xlsxData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const rowCount = xlsxData.length;
    await logInfo(`Total Count: ${rowCount}`);
    for(let i =0 ; i<rowCount;i++){
        const rowData = xlsxData[i] as any;
        await logInfo(`Row ${i + 1} Category: ${rowData.Category}, Product: ${rowData.Product}`);
        page.waitForLoadState("load");
        const categoryLink = page.getByRole('link', { name: (rowData.Category).trim(), exact: true});
        await categoryLink.waitFor({state: 'visible'});
        await categoryLink.click();
        page.waitForTimeout(10000);
        const productName = await page.getByRole('link', { name: (rowData.Product).trim(), exact: true});
        await productName.scrollIntoViewIfNeeded({timeout: 10000});
        await productName.waitFor({state : 'visible'});
        await productName.click();
        page.waitForTimeout(5000);
        //await page.getByRole('link', { name: (rowData.Product).trim(), exact: true}).click();
        await addProductToCart(page,'#gsft_main');
    } 
});

// ai-studio-step-id: 0HAOpTtc
await leapwork.step("Click Proceed to Checkout in the ServiceNow catalog cart", async () => {
    // Click button "Proceed to Checkout"
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"catalog_cart_proceed_checkout\"]" });

// ai-studio-step-id: 5VDFUytg
await leapwork.step("Validate the order status page shows “Thank you, your request has been submitted”", async () => {
    // Assert span contains "Thank you, your request has been submitted"
    await page.waitForTimeout(2000);
    const successNotificationMessage = page.frameLocator('#gsft_main').getByText('Thank you, your request has been submitted');
    await successNotificationMessage.waitFor({state: 'visible' , timeout: 10000});
    await expect(successNotificationMessage).toContainText("Thank you, your request has been submitted");
}, { action: "validate"});

// ai-studio-step-id: ErfASUHe
await leapwork.step("Click the Home button on the ServiceNow order status page", async () => {
    // Click link "Home"
    await page.frameLocator('#gsft_main').locator('button#back_to_catalog_header').click();
}, { action: "click", relativeXpath: "//*[@id=\"back_to_catalog_header\"]" });

// ai-studio-step-id: bd3a6db8
await leapwork.step("Use test case: ServiceNow_LogOut", async () => {
    return await ServiceNowLogOut();
}, { action: "asset_reference", linkedAssetType: "test-case" });