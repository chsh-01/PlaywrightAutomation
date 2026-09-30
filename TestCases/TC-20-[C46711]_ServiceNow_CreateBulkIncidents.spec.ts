import { leapwork } from "./leapwork";

import { ServiceNowLoginToServiceNow } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LoginToServiceNow";
import { filterNavMenuSearch } from "@assets/ServiceNow/Helpers/filterNavMenuSearch";
import { ServiceNowLogOut } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LogOut";

leapwork.variables.set("shortDescription", "Medium Seerity Incident", leapwork.storage.LOCAL);
const lw__shortDescription = leapwork.variables.get("shortDescription", leapwork.storage.LOCAL) as string;

leapwork.variables.set("additionalCommentsCustomerVisible", "New Comment", leapwork.storage.LOCAL);
const lw__additionalCommentsCustomerVisible = leapwork.variables.get("additionalCommentsCustomerVisible", leapwork.storage.LOCAL) as string;

let incNum = "";

leapwork.configuration({
  timeoutMs: Number(
    leapwork.team.settings.get("timeoutMs")
    ?? leapwork.workspace.settings.get("timeoutMs")
  ) || 5000,
  enableSelfHeal:
    (leapwork.team.settings.get("enableSelfHeal")
      ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

// ai-studio-step-id: 7c550bb8
await leapwork.step("Use test case: ServiceNow_LoginToServiceNow", async () => {
    return await ServiceNowLoginToServiceNow();
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: pw5omymt00
await leapwork.step("Use TypeScript asset: FilterHelper", async () => {   
    await filterNavMenuSearch(page,"Incidents","Self-Service", "Incidents");
}, { action: "asset_reference" });

// ai-studio-step-id: e2uvHNCn
await leapwork.step("Click New to create a new incident from the Incidents list", async () => {
    // Click button "New"
    await page.getByRole('button', { name: 'New' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sysverb_new\"]" });

// ai-studio-step-id: TxnyeTgC
await leapwork.step("Validate the ServiceNow page title shows \"Incident\"", async () => {
    // Assert div contains "Incident"
    //await expect(page.getByText('Incident', { exact: true })).toContainText("Incident");
    await expect(page.frameLocator('#gsft_main').locator(".navbar-title-caption")).toContainText("Incident");
}, { action: "validate", relativeXpath: "//*[@class='navbar-title-caption navbar-title-new-record']" });

// ai-studio-step-id: pwx9e8xw00
await leapwork.step("Get the value of the Number Field", async () => {
  // Step implementation
  const numberInput = await page.locator('#incident\\.number').inputValue();
  incNum = numberInput;
}, {
  action: "click"
});

// ai-studio-step-id: Nr5SQAnl
await leapwork.step("Click the Opened date and time calendar button for incident INC0012897", async () => {
    // Click span
    await page.getByRole('button', { name: 'Select Opened date and time' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"incident.opened_at.ui_policy_sensitive\"]/span" });

// ai-studio-step-id: uumJ56UN
await leapwork.step("Click August 5, 2026 in the time picker on the incident form", async () => {
    // Click button "Wednesday, August 5, 2026"
    await page.getByRole('button', { name: 'Wednesday, August 5,' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"GwtDateTimePicker_day10\"]" });

// ai-studio-step-id: CcvLWgCI
await leapwork.step("Click Save (Enter) on the Create Incident form for INC0012897", async () => {
    // Click button "Save (Enter)"
    await page.getByRole('button', { name: 'Save (Enter)' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"GwtDateTimePicker_ok\"]" });

// ai-studio-step-id: bqCYVy4q
await leapwork.step("Select \"2 - Medium\" from Urgency", async () => {
    // Click combobox "Field value has changed since last updateUrgency"
    //await page.getByLabel('Urgency').click();
    //await selectDropDownValueByValue(page,"select#incident\\.urgency",'2');
    const urgency = page.locator("select[name='incident.urgency']");
    await urgency.selectOption({label: '2 - Medium'} );
}, { action: "click", relativeXpath: "//*[@id=\"incident.urgency\"]" });

// ai-studio-step-id: QjXAXauP
await leapwork.step("Select \"In Progress\" from State", async () => {
    // Click combobox "Field value has changed since last updateState"
    //await page.getByLabel('State').click();
    const state = await page.locator('#incident\\.state');
    await state.selectOption({label: 'In Progress'});
}, { action: "click", relativeXpath: "//*[@id=\"incident.state\"]" });

// ai-studio-step-id: EuO9UPTg
await leapwork.step("Click the Short description field on the Create Incident form", async () => {
    // Click textbox "Mandatory - must be populated before SubmitShort description"
    await page.getByRole('textbox', { name: 'Mandatory - must be populated' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"incident.short_description\"]" });

// ai-studio-step-id: n0Me3N0r
await leapwork.step(`Fill the Short description field with "${lw__shortDescription}"`, async () => {
    // Fill textbox "Mandatory - must be populated before SubmitShort description"
    await page.getByRole('textbox', { name: 'Mandatory - must be populated' }).fill(String(lw__shortDescription));
}, { action: "input", relativeXpath: "//*[@id=\"incident.short_description\"]" });

// ai-studio-step-id: X6onAIeg
await leapwork.step("Click the Additional comments (Customer visible) field on the incident form", async () => {
    // Click textbox "Additional comments (Customer visible)"
    await page.getByRole('textbox', { name: 'Additional comments (Customer' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"incident.comments\"]" });

// ai-studio-step-id: iPnsVTaM
await leapwork.step(`Fill Additional comments (Customer visible) with "${lw__additionalCommentsCustomerVisible}"`, async () => {
    // Fill textbox "Additional comments (Customer visible)"
    await page.getByRole('textbox', { name: 'Additional comments (Customer' }).fill(String(lw__additionalCommentsCustomerVisible));
}, { action: "input", relativeXpath: "//*[@id=\"incident.comments\"]" });

// ai-studio-step-id: szcLq4Oc
await leapwork.step("Click the Submit button to create the incident record", async () => {
    // Click button "Submit"
    await page.locator('#sysverb_insert').click();
}, { action: "click", relativeXpath: "//*[@id=\"sysverb_insert\"]" });

// ai-studio-step-id: QwHFyfdv
await leapwork.step("Select \"Number\" from Search a specific field of the Incidents list, 4 items", async () => {
    // Click listbox "Search a specific field of the Incidents list, 4 items"
    //await page.getByLabel('Search a specific field of').click();
    const frame = page.frameLocator('#gsft_main');
    const filterDropdown = frame.locator("[id$='_select']");
    await filterDropdown.selectOption({label: 'Number'});
}, { action: "click", relativeXpath: "//*[@id$=_select]" });

// ai-studio-step-id: ufpzSisp
await leapwork.step("Click the Search field in the Incidents list&returns", async () => {
    // Click searchbox "Search"
    await page.getByRole('searchbox', { name: 'Search', exact: true }).click();
}, { action: "click", relativeXpath: "//*[@id=\"f32a9021c36a03500e477275e4013141_text\"]" });

// ai-studio-step-id: uokLz27c
await leapwork.step(`Fill the Incidents search field with "${incNum}"`, async () => {
    // Fill searchbox "Search"
    await page.getByRole('searchbox', { name: 'Search', exact: true }).fill(String(incNum));
}, { action: "input", relativeXpath: "//*[@id=\"f32a9021c36a03500e477275e4013141_text\"]" });

// ai-studio-step-id: 5ayYhUfF
await leapwork.step("Press Enter to confirm the current action on the Incidents View page", async () => {
    // Press Enter on element
    await page.keyboard.press("Enter");
}, { action: "keydown" });

// ai-studio-step-id: pw1get45u0
await leapwork.step(`Validate incident list shows open record ${incNum}`, async () => {
    // Assert link contains same incident number
    await expect(page.locator('tr td.vt').first()).toContainText(incNum);
}, { action: "validate", relativeXpath: "//*[starts-with(@id,'row_incident_')]/td[3]/a" });

// ai-studio-step-id: dea63359
await leapwork.step("Use test case: ServiceNow_LogOut", async () => {
    return await ServiceNowLogOut();
}, { action: "asset_reference", linkedAssetType: "test-case" });