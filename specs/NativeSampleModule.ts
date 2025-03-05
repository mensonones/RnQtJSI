import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
  readonly multiply: (a: number, b: number) => number;
  readonly generateSecurityPassword: (length: number, useNumbers: boolean, useSymbols: boolean) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);