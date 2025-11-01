Este é um aplicativo de Temporizador de Estudo criado usando React Native e React Hooks, conforme as especificações.

Requisitos

Para executar este projeto em um emulador ou dispositivo móvel, você precisará:

Node.js (versão LTS recomendada)

npm ou yarn

Expo CLI (instalado globalmente: npm install -g expo-cli)

O aplicativo Expo Go instalado no seu celular (iOS ou Android) para testes no dispositivo.

Instalação e Execução

Clone o repositório:

git clone [SEU_REPOSITORIO]
cd [NOME_DA_PASTA]


Instale as dependências:

npm install 
# ou
yarn install


Execute o projeto:

expo start


Isso abrirá o Metro Bundler no seu navegador. Você pode então:

Escanear o código QR com o aplicativo Expo Go no seu celular.

Pressionar a no terminal para abrir no emulador Android.

Pressionar i no terminal para abrir no simulador iOS.

Funcionalidades Implementadas

Controle do Timer: Botões "Iniciar", "Pausar" e "Resetar" que controlam a contagem regressiva.

Configuração de Tempo: TextInput com keyboardType="numeric" para definir o tempo inicial da sessão.

Exibição: Tempo no formato MM:SS.

Alertas Visuais: O display do timer muda de cor quando o tempo restante é inferior a 60 segundos.

Alerta de Fim: Uma mensagem (implementada via Modal na versão Web do Canvas, mas configurada para Alert e Vibration.vibrate() no React Native real) é exibida quando o tempo chega a zero.

Estatísticas: Contagem de sessões completas e o tempo total de estudo acumulado.
