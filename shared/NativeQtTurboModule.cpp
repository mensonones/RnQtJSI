#include <dlfcn.h>
#include <stdexcept>
#include <memory> 
#include "NativeQtTurboModule.h"

namespace facebook::react {

std::unique_ptr<void, decltype(&dlclose)> loadLibrary(const char* libraryPath) {
    void* handle = dlopen(libraryPath, RTLD_LAZY);
    if (!handle) {
        throw std::runtime_error("Erro ao carregar a biblioteca: " + std::string(dlerror()));
    }
    return std::unique_ptr<void, decltype(&dlclose)>(handle, &dlclose);
}

template <typename FuncType>
FuncType getSymbol(void* handle, const char* symbolName) {
    dlerror();
    FuncType func = reinterpret_cast<FuncType>(dlsym(handle, symbolName));
    const char* error = dlerror();
    if (error) {
        throw std::runtime_error("Erro ao localizar o símbolo '" + std::string(symbolName) + "': " + std::string(error));
    }
    return func;
}

NativeQtTurboModule::NativeQtTurboModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeQtTurboModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeQtTurboModule::getMessage(jsi::Runtime& rt) {
    static auto library = loadLibrary("libRnQtJSILibrary_arm64-v8a.so");
    static auto getMessageFunc = getSymbol<const char* (*)()>(library.get(), "getLibraryMessage");

    const char* message = getMessageFunc();
    return std::string(message);
}

int NativeQtTurboModule::multiply(jsi::Runtime& rt, int a, int b) {
    static auto library = loadLibrary("libRnQtJSILibrary_arm64-v8a.so");
    static auto multiplyFunc = getSymbol<int (*)(int, int)>(library.get(), "multiply");

    return multiplyFunc(a, b);
}

} // namespace facebook::react