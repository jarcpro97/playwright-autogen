import * as fs from 'fs';
import * as path from 'path';
import { parseTestFile } from './utils/parseTestFile';
import { generatePOMClass } from './utils/generatePOMClass';

export async function generatePOMFiles() {
    // Path to the generated test file
    const testFilePath = path.join(__dirname, '..', 'generated_tests', 'test-1.spec.ts');

    try {
        // Read test file
        const data = await fs.promises.readFile(testFilePath, 'utf8');

        // Parse test file
        const { testName, testSteps } = parseTestFile(data);

        // Generate POM class based on parsed information
        const pomClassContent = await generatePOMClass(testName, testSteps);

        // Write POM class file
        const className = `${testName.replace(/ /g, '')}Page`;
        const filePath = path.join(__dirname, '..', 'pages', `${className}.ts`);
        fs.writeFileSync(filePath, pomClassContent);
    } catch (err) {
        console.error('Error:', err);
    }
}

generatePOMFiles();
