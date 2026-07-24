import { expect, test } from "@playwright/test";

test("kinetic typography showcase does not mix animation shorthand with delay", async ({
  page,
}) => {
  const problematicMessages: string[] = [];
  const conflictingAnimationPattern =
    /hydrated but some attributes|hydration-mismatch|style property during rerender|conflicting property is set|animationDelay/;

  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      conflictingAnimationPattern.test(message.text())
    ) {
      problematicMessages.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    if (conflictingAnimationPattern.test(error.message)) {
      problematicMessages.push(error.message);
    }
  });

  await page.goto("/styles/kinetic-typography/showcase", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForTimeout(5000);

  expect(problematicMessages).toEqual([]);
});
