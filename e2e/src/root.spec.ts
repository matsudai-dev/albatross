import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/", { timeout: 30 * 1000 });
});

test("should add a new bird and update the list", async ({ page }) => {
	// 初期状態で2行であることを確認
	const tableRows = page.getByTestId("bird-row");
	await expect(tableRows).toHaveCount(2);

	// フォームに入力
	await page.locator("#latin-name-input").fill("Corvus macrorhynchos");
	await page.locator("#name-ja-input").fill("ハシブトガラス");
	await page.locator("#name-en-input").fill("Large-billed Crow");

	// 追加ボタンをクリック
	await page.locator("#add-bird-button").click();

	// 成功メッセージが表示されるまで待つ
	const successMessage = page.getByTestId("success-message");
	await successMessage.waitFor({ state: "visible", timeout: 30000 });
	await expect(successMessage).toHaveText("Success: Added bird successfully.");

	// リロード後のページを待つ
	await page.waitForLoadState("networkidle");

	// ページが更新され、行数が3になることを確認
	await expect(tableRows).toHaveCount(3);
});
