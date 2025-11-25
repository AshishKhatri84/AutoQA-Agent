export interface UploadedFile {
  name: string;
  content: string;
  type: 'document' | 'html';
  size: number;
}

export interface TestCase {
  testId: string;
  feature: string;
  scenario: string;
  expectedResult: string;
  groundedIn: string;
}

export enum AppPhase {
  INGESTION = 'INGESTION',
  TEST_GENERATION = 'TEST_GENERATION',
  SCRIPT_GENERATION = 'SCRIPT_GENERATION'
}

export interface ScriptResult {
  code: string;
  explanation: string;
}
