import { TestInfo } from "./parseTestFile";
import * as prettier from 'prettier';

export async function generatePOMClass(testName: string, testSteps: { action: string, code: string }[]): Promise<string> {
    const className = `${testName.replace(/ /g, '')}Page`; // Generate class name from test name
    let classContent = `
        import { expect, type Page} from "@playwright/test";

        export class ${className} {

            readonly page: Page;
                
            constructor(page: Page) {
                this.page = page;
            }
        `;
    
    // Generate methods for each action
    testSteps.forEach(({ action, code }, index) => {
        classContent += `
            async ${action.replace(/ /g, '')}() {
                ${code.replace(/page\./g, 'this.page.')}
            }`;
    });
    classContent += `}`;

    classContent = await prettier.format(classContent, { parser: 'typescript' });

    return classContent;
}