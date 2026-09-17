export interface AppsScriptPayload {
  architectFirm: string;
  mobile: string;
  location: string;
  buildingType: string;
  subType: string | null;
  quantity: number;
}

export interface AppsScriptResult {
  buildingType: string;
  subType: string | null;
  quantity: number;
  unit: string;
  rate: number;
  personsPerUnit: number;
  designPopulation: number;
  waterLitres: number;
  waterKL: number;
  sewageFactor: number;
  sewageKL: number;
  stpFactor: number;
  stpKL: number;
}

interface AppsScriptRunner {
  withSuccessHandler(callback: (result: any) => void): AppsScriptRunner;
  withFailureHandler(callback: (error: any) => void): AppsScriptRunner;

  calculateWaterDemand(
    data: AppsScriptPayload
  ): void;

  saveUsage(
    data: AppsScriptPayload
  ): void;
}

declare global {
  interface Window {
    google?: {
      script?: {
        run?: AppsScriptRunner;
      };
    };
  }
}

function getRunner(): AppsScriptRunner {
  const runner = window.google?.script?.run;

  if (!runner) {
    throw new Error(
      "Google Apps Script is not available."
    );
  }

  return runner;
}

export function calculateWaterDemand(
  data: AppsScriptPayload
): Promise<AppsScriptResult> {
  return new Promise((resolve, reject) => {
    try {
      getRunner()
        .withSuccessHandler(
          (result: AppsScriptResult) => {
            resolve(result);
          }
        )
        .withFailureHandler((error: Error) => {
          reject(error);
        })
        .calculateWaterDemand(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function saveUsage(
  data: AppsScriptPayload
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      getRunner()
        .withSuccessHandler(() => {
          resolve();
        })
        .withFailureHandler((error: Error) => {
          reject(error);
        })
        .saveUsage(data);
    } catch (error) {
      reject(error);
    }
  });
}