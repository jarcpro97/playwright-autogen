export interface TestInfo {
    testName: string;
    testSteps: { action: string, code: string }[];
}

export function parseTestFile(testFileContent: string): TestInfo {
    const testNameRegex = /\/\/ PageClass: (.+)/; // Regex to extract test name
    const actionRegex = /\/\/ Action: (.+?)\n((?:.|\n)*?)(?=(\/\/ Action:| \/\/ end))/g;

    const testNameMatch = testNameRegex.exec(testFileContent);
    const testName = testNameMatch ? testNameMatch[1] : 'Test'; // Default test name if not found

    const testSteps: { action: string, code: string }[] = [];
    let match;
    while ((match = actionRegex.exec(testFileContent)) !== null) {
        const action = match[1];
        const code = match[2];
        testSteps.push({ action, code });
    }

    return { testName, testSteps };
}