import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly getMessage: () => string;
  readonly multiply: (a: number, b: number) => number;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeQtTurboModule',
);