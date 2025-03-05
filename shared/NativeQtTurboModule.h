#pragma once

#include <AppSpecsJSI.h>
#include <jsi/jsi.h>
#include <memory>
#include <string>

namespace facebook::react {

class NativeQtTurboModule : public NativeQtTurboModuleCxxSpec<NativeQtTurboModule> {
public:
  explicit NativeQtTurboModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string getMessage(jsi::Runtime& rt);
  int multiply(jsi::Runtime& rt, int a, int b);
};

} // namespace facebook::react