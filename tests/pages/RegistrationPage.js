class RegistrationPage {
    /**
     * Constructor for RegistrationPage
     * @param {object} page - Playwright's Page object
     */
    constructor(page) {
        this.page = page;

        // Form locator
        this.form = page.locator('#customerForm');

        // Input fields for user details
        this.firstNameField = page.locator('#customer\\.firstName');
        this.lastNameField = page.locator('#customer\\.lastName');
        this.streetField = page.locator('#customer\\.address\\.street');
        this.cityField = page.locator('#customer\\.address\\.city');
        this.stateField = page.locator('#customer\\.address\\.state');
        this.zipCodeField = page.locator('#customer\\.address\\.zipCode');
        this.phoneNumberField = page.locator('#customer\\.phoneNumber');
        this.ssnField = page.locator('#customer\\.ssn');
        this.usernameField = page.locator('#customer\\.username');
        this.passwordField = page.locator('#customer\\.password');
        this.repeatedPasswordField = page.locator('#repeatedPassword');

        // Submit button
        this.submitButton = page.locator('button[type="submit"]');
    }

    /**
     * Fills out the registration form with sample data and provided credentials
     * @param {string} username - The username for registration
     * @param {string} password - The password for registration
     * @returns {Promise<void>}
     */
    async fillForm(username, password) {
        await this.firstNameField.fill('John');
        await this.lastNameField.fill('Doe');
        await this.streetField.fill('123 Test Street');
        await this.cityField.fill('Toronto');
        await this.stateField.fill('ON');
        await this.zipCodeField.fill('12345');
        await this.phoneNumberField.fill('1234567890');
        await this.ssnField.fill('123-45-6789');
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.repeatedPasswordField.fill(password);
    }

    /**
     * Submits the registration form
     * @returns {Promise<void>}
     */
    async submitForm() {
        await this.submitButton.click();
    }
}

module.exports = RegistrationPage;
