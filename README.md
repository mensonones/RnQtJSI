---

Este projeto é um exemplo de como integrar uma biblioteca compartilhada (arquivo .so) em um aplicativo React Native usando JSI (JavaScript Interface) no Android. O objetivo é demonstrar como carregar e utilizar funções de uma biblioteca nativa escrita em C++ diretamente no JavaScript.

O projeto utiliza `dlopen` e `dlsym` para carregar e acessar funções da biblioteca compartilhada diretamente no C++.

   - O C++ é usado para implementar um módulo TurboModule, que permite a comunicação direta entre o JavaScript e o código nativo.
   - Uma biblioteca compartilhada escrita em C++ que contém funções como `getMessage` (retorna uma mensagem) e `multiply` (multiplica dois números).
   - Essa biblioteca é carregada dinamicamente em tempo de execução usando `dlopen` no código C++.
   - O lado JavaScript do projeto consome as funções expostas pelo módulo TurboModule, permitindo que o aplicativo React Native interaja com a biblioteca compartilhada.

--- 
