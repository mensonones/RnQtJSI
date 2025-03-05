#pragma once

#include <AppSpecsJSI.h>

#include <memory>
#include <string>

namespace facebook::react {

class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
public:
  NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string reverseString(jsi::Runtime& rt, std::string input);

  int multiply(jsi::Runtime& rt, int a, int b);

  std::string generateSecurityPassword(jsi::Runtime& rt, int length, bool useNumbers, bool useSymbols);

};

} // namespace facebook::react
