const EmailService = require("../emailService");

const emailService = new EmailService();

// eslint-disable-next-line no-undef
test("Enviando email", () => {
  async function sendEmail() {
    const result = await emailService.sendEmail(
      "yuri.tduque@gmail.com",
      "email teste",
      "emails de test"
    );

    if (result) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line no-undef
  expect(sendEmail()).toBe(true);
});

// Error:   "Jest did not exit one second after the test run has completed. This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue."
