//Esse código será inteiro comentado para futuras consultas

// Importa o módulo "path" do Node.js para trabalhar com caminhos de arquivos e diretórios
const path = require("path");

// Importa o plugin para gerar um arquivo HTML dinamicamente
const HtmlWebPackPlugin = require("html-webpack-plugin");

// Importa o plugin copiar arquivos e pastas para o diretório de saída
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // Define o alvo da build como "web", indicando que o código será executado no navegador
  target: "web",

  // Define o modo de compilação como "development" para facilitar o debugging e melhorar a velocidade da compilação
  mode: "development",

  // Define o arquivo de entrada principal do Webpack
  entry: path.resolve(__dirname, "src", "main.js"),

  // Configura a saída da compilação
  output: {
    filename: "main.js", // Nome do arquivo de saída gerado
    path: path.resolve(__dirname, "dist"), // Caminho do diretório de saída
  },

  // Configuração do servidor de desenvolvimento (Webpack DevServer)
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Define o diretório onde os arquivos estáticos estarão disponíveis
    },
    port: 3000, // Define a porta do servidor
    open: true, // Abre automaticamente o navegador ao iniciar o servidor
    liveReload: true, // Habilita recarregamento automático sempre que houver mudanças no código
  },

  // Configuração dos plugins utilizados pelo Webpack
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "index.html"), // Define o arquivo HTML base
      favicon: path.resolve("src", "assets", "scissors.svg"), // Define um favicon para a página
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"), // Origem dos arquivos a serem copiados
          to: path.resolve(__dirname, "dist", "src", "assets"), // Destino dos arquivos copiados na pasta "dist"
        },
      ],
    }),
  ],

  // Configuração de regras para o processamento de arquivos
  module: {
    rules: [
      {
        test: /\.css$/, // Define que essa regra se aplica a arquivos CSS
        use: ["style-loader", "css-loader"], // Aplica os loaders necessários para processar arquivos CSS
      },
      {
        test: /\.js$/, // Filtro por arquivos javascript
        exclude: /node_modules/, //Exclui a pasta Node Modules do filtro
        use:{
            loader:"babel-loader",
            options: {
                presets: ["@babel/preset-env"], //preset a ser usado
            }
        }
      }
    ],
  },
};
