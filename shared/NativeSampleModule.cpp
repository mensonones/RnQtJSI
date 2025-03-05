#include "NativeSampleModule.h"

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

int NativeSampleModule::multiply(jsi::Runtime& rt, int a, int b) {
  return a * b;
}

std::string NativeSampleModule::generateSecurityPassword(jsi::Runtime& rt, int length, bool useNumbers, bool useSymbols) {
  std::string password;
  std::string alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  std::string numbers = "0123456789";
  std::string symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  std::string chars = alphabet;
  if (useNumbers) {
    chars += numbers;
  }
  if (useSymbols) {
    chars += symbols;
  }

  for (int i = 0; i < length; i++) {
    password += chars[rand() % chars.size()];
  }

  return password;
}

} // namespace facebook::react