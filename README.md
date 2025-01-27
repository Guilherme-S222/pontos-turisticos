# Pontos Turísticos do Brasil 🌎

Projeto Full Stack para cadastro e listagem de pontos turísticos do Brasil.

O projeto é composto por:

- **Back-end:** API construída em C#;
- **Banco de dados:** SQLite;
- **Front-end:** HTML, CSS e JavaScript.

## Estrutura do Projeto

```plaintext
📂pontos-turisticos/
            ├── /📂frontend           # Código do front-end
            ├── /📂src                # Código do back-end
            ├── 💾PontosDatabase.db   # Arquivo do banco de dados SQLite
            └── 📝README.md           # Este arquivo
```

## Guia de Execução do Projeto Pontos Turísticos 🗺️

Este guia descreve os passos necessários para executar o projeto **Pontos Turísticos**, desde o download do código até o acesso à interface web e à API.

## 🛠️ Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes itens instalados:

- **[VSCode download](https://code.visualstudio.com/download)**
- **[.NET download](https://dotnet.microsoft.com/pt-br/download)**
- Um navegador web atualizado.

## ▶️ Passos para executar o projeto

### **1. Baixar o repositório**

- **1.1.** Faça o download do repositório como arquivo ZIP.
- **1.2.** Após o download, extraia o conteúdo do arquivo para um local de sua preferência.

### **2. Configurar o banco de dados**

- **2.1.** Abra o VSCode e selecione a pasta extraída do projeto.
- **2.2.** No painel lateral de navegação, localize o arquivo de configuração do banco de dados:

```
📂pontos-turisticos/
            └──📂src
                └──📂PontosTuristicos.Infrastructure
                    └──📄PontosDbContext.cs

```

- **2.3.** No arquivo **PontosDbContext.cs**, atualize o caminho do banco de dados na linha abaixo:

```
optionsBuilder.UseSqlite("Data Source=INSERIR-O-CAMINHO-DO-BANCO-DE-DADOS-AQUI/PontosDatabase.db");
```

- **2.4.** Para encontrar o caminho correto do banco de dados (**PontosDatabase.db**):

  - Localize o arquivo do banco de dados na pasta do projeto.
    ```
    📂pontos-turisticos/
            └── 💾PontosDatabase.db
    ```
  - Clique com o botão direito no arquivo e selecione **Propriedades**.
  - Copie o valor do campo **Local**, que será algo como:
    - C:/Users/seu-usuario/pontos-turisticos-main/PontosDatabase.db.
  - Salve o arquivo 📄**PontosDbContext.cs**

### **3. Executar a API**

- **3.1.** No VSCode, abra o terminal integrado.
- **3.2.** Navegue até o diretório da API com os comandos:

```
cd src
cd .\PontosTuristicos.Api\
```

- **3.3.** Compile e inicie a API executando:

```
dotnet run

```

- **3.4.** Aguarde até que a mensagem abaixo apareça no terminal:

```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5294
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
...

```

- **Anote a URL fornecida**, geralmente algo como: **http://localhost:5294.**

### **4. Testar a API**

- **4.1.** Com a URL anotada, abra seu navegador e acesse a URL da documentação Swagger da API, por exemplo:

```
http://localhost:5294/swagger
```

- **4.2.** Explore os endpoints disponíveis para testar as funcionalidades do projeto.

### **5. Executar o frontend**

- **5.1** - Com a API rodando, abra o explorador de arquivos e localize o arquivo **index.html**:

```
📂pontos-turisticos/
    └──📂frontend
        └──📄index.html
```

- **5.2** - Clique duas vezes no arquivo para abri-lo no navegador.
  - Isso abrirá a página inicial do projeto, onde você poderá explorar o frontend.

### 🏁 **Conclusão**

Seguindo os passos acima, você configurou e executou o projeto Pontos Turísticos com sucesso! 🚀

### 🚧 **Ajustando a Porta da API no Frontend**

Por padrão, o frontend está configurado para realizar requisições à API utilizando as seguintes portas:

- HTTP: http://localhost:5294
- HTTPS: https://localhost:7076

No entanto, se a API for iniciada em uma porta diferente na sua máquina, será necessário atualizar essas configurações para garantir que o frontend se conecte corretamente à API.

**Localizando e alterando a porta no arquivo index.js**

- **1.** No VSCode, localize o arquivo de configuração **javascript** do frontend:

  ```
  📂pontos-turisticos/
      └──📂frontend
          └──📄index.js

  ```

- **2.** Abra o arquivo e encontre as seguintes linhas no início do código:

  ```
  // Definindo porta para as requisições na API
  const portaHttp = 'http://localhost:5294';
  const portaHttps = 'https://localhost:7076';

  ```

- **3.** Substitua os valores das variáveis **portaHttp** e/ou **portaHttps** para corresponder à porta exibida no terminal ao iniciar a API.

  Por exemplo, se a API estiver rodando na porta **http://localhost:5000**, altere para:

  ```
  const portaHttp = 'http://localhost:5000';
  const portaHttps = 'https://localhost:5001';

  ```

- **4.** Salve o arquivo.

**Observação**

Certifique-se de que o **protocolo (http ou https)** e a **porta** configurados correspondam exatamente às informações exibidas no **terminal** ao executar a API.

Com isso, o frontend será atualizado para se comunicar corretamente com a API na porta configurada.

#

## Documentação da API 📄

#### Cadastro de um ponto turístico

```http
  POST /api/Pontos
```

| Parâmetro     | Tipo        | Descrição        |
| :------------ | :---------- | :--------------- |
| `name`        | `string`    | **Obrigatório**. |
| `description` | `string`    | **Opcional**     |
| `location`    | `string`    | **Obrigatório**  |
| `city`        | `string`    | **Obrigatório**  |
| `state`       | `string`    | **Obrigatório**  |
| `Image`       | `IFormFile` | **Opcional**     |
| `ImagePath`   | `string`    | **Opcional**     |

#### Retorna todos os pontos turísticos

```http
  GET /api/Pontos
```

#### Retorna um ponto turístico

```http
  GET /api/Pontos/{id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Retorna um ou mais pontos turísticos com base no parâmetro informado

```http
  GET /api/Pontos/{name}/search
```

| Parâmetro | Tipo     | Descrição                                           |
| :-------- | :------- | :-------------------------------------------------- |
| `name`    | `string` | **Obrigatório**. O parâmetro de busca que você quer |

#### Deletar um ponto turístico

```http
  DELETE /api/Pontos/{id}
```

| Parâmetro | Tipo     | Descrição                                                      |
| :-------- | :------- | :------------------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do ponto turístico que você quer deletar |

Obs.: Toda a documentação da API também consta no Swagger ao compilar e executar o projeto

## Referência

- [Visual Studio Code](https://code.visualstudio.com/download)
- [.NET](https://dotnet.microsoft.com/pt-br/download)
