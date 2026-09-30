import { leapwork } from "./leapwork";

import { ServiceNowLoginToServiceNow } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LoginToServiceNow";
import { selectDropDownValueByValue } from "@assets/ServiceNow/Helpers/selectDropDownHelper";
import { ServiceNowLogOut } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LogOut";
import { filterNavMenuSearch } from "@assets/ServiceNow/Helpers/filterNavMenuSearch";

leapwork.variables.set("chooseOption", "Keywords", leapwork.storage.LOCAL);
const lw__chooseOption = leapwork.variables.get("chooseOption", leapwork.storage.LOCAL) as string;

const emailName = `TestEmailSummary-${Date.now()}`
leapwork.variables.set("name", emailName, leapwork.storage.LOCAL);
const lw__name = leapwork.variables.get("name", leapwork.storage.LOCAL) as string;

leapwork.variables.set("description", "This is a test email summary created by automation", leapwork.storage.LOCAL);
const lw__description = leapwork.variables.get("description", leapwork.storage.LOCAL) as string;

leapwork.variables.set("hours", "10", leapwork.storage.LOCAL);
const lw__hours = leapwork.variables.get("hours", leapwork.storage.LOCAL) as string;

leapwork.variables.set("minutes", "30", leapwork.storage.LOCAL);
const lw__minutes = leapwork.variables.get("minutes", leapwork.storage.LOCAL) as string;

leapwork.configuration({
  timeoutMs: Number(
    leapwork.team.settings.get("timeoutMs")
    ?? leapwork.workspace.settings.get("timeoutMs")
  ) || 5000,
  enableSelfHeal:
    (leapwork.team.settings.get("enableSelfHeal")
      ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

// ai-studio-step-id: 9e013e8c
await leapwork.step("Use test case: ServiceNow_LoginToServiceNow", async () => {
    return await ServiceNowLoginToServiceNow();
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: pw61hb5f00
await leapwork.step("Use TypeScript asset: filterNavMenuSearch", async () => {
    await filterNavMenuSearch(page,"Email Summaries", "Platform Analytics Administration", "Email Summaries");
}, { action: "asset_reference" });

// ai-studio-step-id: dIkaT2oK
await leapwork.step("Click the New button to create a scheduled email summary.", async () => {
    // Click button "New"
    await page.getByRole('button', { name: 'New' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sysverb_new\"]" });

// ai-studio-step-id: pw1xqn9on0
await leapwork.step("Validate the \"Scheduled Email Summary\" title on the New Record page", async () => {
    // Assert div contains "Scheduled Email Summary"
    
    const pageHeading = await page.frameLocator('#gsft_main').locator('h1').filter({hasText : 'Scheduled Email Summary'});
    pageHeading.waitFor({state: 'visible', timeout: 30000});
    await expect(pageHeading).toContainText("Scheduled Email Summary");
}, { action: "validate" });

// ai-studio-step-id: OyVs5psz
await leapwork.step("Click the Name field on the Scheduled Email Summary form", async () => {
    // Click textbox "Name"
    await page.getByRole('textbox', { name: 'Name' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.name\"]" });

// ai-studio-step-id: 3L0qLXwv
await leapwork.step(`Fill the Name field with "${lw__name}"`, async () => {
    // Fill textbox "Name"
    await page.getByRole('textbox', { name: 'Name' }).fill(String(lw__name));
}, { action: "input", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.name\"]" });

// await leapwork.step("Validate the Name field shows \"Test Email Summary\" on the Scheduled Email Summary form", async () => {
//     // Assert textbox "Field value has changed since last updateName" contains "Test Email Summary"
//     await expect(await page.locator("//input[@id='sysauto_indicator_notifications.name']")).toContainText(lw__name);
// }, { action: "validate", relativeXpath: "//*[@id=\"sysauto_indicator_notifications\\.name\"]" });

// ai-studio-step-id: O7yxOlfj
await leapwork.step("Click the Description field on the New Scheduled Email Summary form", async () => {
    // Click textbox "Description"
    await page.getByRole('textbox', { name: 'Description' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.description\"]" });

// ai-studio-step-id: qd0xikr4
await leapwork.step(`Fill the Description field with "${lw__description}" on the New Scheduled Email Summary form`, async () => {
    // Fill textbox "Description"
    await page.getByRole('textbox', { name: 'Description' }).fill(String(lw__description));
}, { action: "input", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.description\"]" });

// await leapwork.step("Validate Description equals 'This is a test email summary created by automation' on New Record", async () => {
//     // Assert textbox "Field value has changed since last updateDescription" contains "This is a test email summary created by automation"
//     await expect(page.getByRole('textbox', { name: 'Field value has changed since last updateDescription' })).toHaveValue("This is a test email summary created by automation");
// }, { action: "validate", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.description\"]" });

// ai-studio-step-id: pw1suwzy80
await leapwork.step("Unset \"Active\" checkbox", async () => {
    // Uncheck checkbox "Active"
    await page.getByLabel('Active').uncheck();
    await expect(page.getByLabel('Active')).not.toBeChecked();
    
}, { action: "click", relativeXpath: "//*[@id=\"ni.sysauto_indicator_notifications.active\"]" });

// ai-studio-step-id: ILaODBeB
await leapwork.step("Select \"Monthly\" from Run", async () => {
    // Click combobox "Field value has changed since last updateRun"
    
    selectDropDownValueByValue(page,"#sysauto_indicator_notifications\\.run_type","monthly","#gsft_main");
    //await page.getByLabel('Run').click();
}, { action: "click", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.run_type\"]" });

// ai-studio-step-id: AaRM2N2j
await leapwork.step("Set \"Active\" checkbox", async () => {
    // Check checkbox "Active"
    //await page.getByRole('checkbox', { name: 'ActiveBy' }).check();
    await page.getByLabel('Active').check();
}, { action: "click", relativeXpath: "//*[@id=\"ni.sysauto_indicator_notifications.active\"]" });

// ai-studio-step-id: mBdti2sI
await leapwork.step("Select \"3\" from Day", async () => {
    // Click combobox "Field value has changed since last updateDay"
    //await page.locator('[id="sysauto_indicator_notifications.run_dayofmonth"]').click();
    selectDropDownValueByValue(page,"#sysauto_indicator_notifications\\.run_dayofmonth",'3',"#gsft_main");
}, { action: "click", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.run_dayofmonth\"]" });

// ai-studio-step-id: nxrje2r4
await leapwork.step("Click the Hours field in the Scheduled Email Summary form", async () => {
    // Click textbox "Hours"
    await page.getByRole('textbox', { name: 'Hours' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.run_timedur_hour\"]" });

// ai-studio-step-id: NhpTEl7r
await leapwork.step(`Fill the Hours field with "${lw__hours}" on the Scheduled Email Summary form`, async () => {
    // Fill textbox "Hours"
    await page.getByRole('textbox', { name: 'Hours' }).fill(String(lw__hours));
}, { action: "input", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.run_timedur_hour\"]" });

// ai-studio-step-id: edqCsiGS
await leapwork.step("Press Tab to move focus to the next field on the New Record form", async () => {
    // Press Tab on element
    await page.keyboard.press("Tab");
}, { action: "keydown" });

// ai-studio-step-id: 1QoLmhX7
await leapwork.step(`Fill the Minutes field with "${lw__minutes}" on the Scheduled Email Summary form`, async () => {
    // Fill textbox "Minutes"
    await page.getByRole('textbox', { name: 'Minutes' }).fill(String(lw__minutes));
}, { action: "input", relativeXpath: "//*[@id=\"sysauto_indicator_notifications.run_timedur_min\"]" });

// ai-studio-step-id: Ubc7uiJw
await leapwork.step("Press Tab to move to the next field on the New Record form", async () => {
    // Press Tab on element
    await page.keyboard.press("Tab");
}, { action: "keydown" });

// ai-studio-step-id: JlchM5Qn
await leapwork.step("Unset \"By Condition\" checkbox", async () => {
    // Uncheck checkbox "By Condition"
    await page.getByLabel('By Condition').uncheck();
}, { action: "click", relativeXpath: "//*[@id=\"ni.sysauto_indicator_notifications.by_condition\"]" });

// ai-studio-step-id: SNM1Px0j
await leapwork.step("Set \"By Condition\" checkbox", async () => {
    // Check checkbox "By Condition"
    await page.getByLabel('By Condition').check();
}, { action: "click", relativeXpath: "//*[@id=\"ni.sysauto_indicator_notifications.by_condition\"]" });

// ai-studio-step-id: pw1kcmiu60
await leapwork.step("Click the Input value field for the Keywords condition", async () => {
    // Click textbox "Input value"
    //await page.getByRole('textbox', { name: 'Input value' }).click();
    await page.locator('##field').click();
}, { action: "click", relativeXpath: "//*[@id='field']" });

// ai-studio-step-id: M68YhTzT
await leapwork.step(`Fill the “Choose option” combobox with “${lw__chooseOption}”`, async () => {
    // Fill combobox "Choose option"
    await page.getByRole('combobox', { name: 'Choose option' }).fill(String(lw__chooseOption));
}, { action: "input", relativeXpath: "//*[@id=\"s2id_autogen8_search\"]" });

// ai-studio-step-id: pw5xsgov00
await leapwork.step("Select Condition Keywords from the list", async () => {
  // Step implementation
  await page.getByRole('option', {
     name: 'Keywords'
   }).click();
}, {
  action: "click"
});

// ai-studio-step-id: JgHrqtdD
await leapwork.step("Click the Submit button to create the new scheduled email summary record", async () => {
    // Click button "Submit"
    await page.locator('#sysverb_insert_bottom').click();
}, { action: "click", relativeXpath: "//*[@id=\"sysverb_insert_bottom\"]" });

// ai-studio-step-id: wxekCD5x
await leapwork.step("Click the Search field in the Scheduled Email Summaries list", async () => {
    // Click searchbox "Search"
    await page.getByRole('searchbox', { name: 'Search', exact: true }).click();
}, { action: "click", relativeXpath: "//*[@id=\"d64ed385c322cf100e477275e4013164_text\"]" });

// ai-studio-step-id: VYkB02n3
await leapwork.step(`Fill the Search field in Scheduled Email Summaries with "${lw__name}"`, async () => {
    // Fill searchbox "Search"
    await page.getByRole('searchbox', { name: 'Search', exact: true }).fill(String(lw__name));
}, { action: "input", relativeXpath: "//*[@id=\"d64ed385c322cf100e477275e4013164_text\"]" });

// ai-studio-step-id: WYLn5RjX
await leapwork.step("Press Enter on the Scheduled Email Summaries page", async () => {
    // Press Enter on element
    await page.keyboard.press("Enter");
}, { action: "keydown" });

// ai-studio-step-id: pwkez1tu00
await leapwork.step(`Validate Scheduled Email Summaries lists${lw__name}`, async () => {
    // Assert link "Open record: TestEmailSummary-1786014274735" contains "TestEmailSummary-1786014274735"
    await expect(page.locator('tbody tr td.vt').first()).toContainText(lw__name);
}, { action: "validate", relativeXpath: `//*[starts-with(@id,'row_sysauto_indicator_notifications_')]/td[3]/a[@aria-label=\"Open record: ${lw__name}"]` });

// ai-studio-step-id: pwg5bw5i00
await leapwork.step("Use test case: ServiceNow_LogOut", async () => {
    return await ServiceNowLogOut();
}, { action: "asset_reference", linkedAssetType: "test-case" });