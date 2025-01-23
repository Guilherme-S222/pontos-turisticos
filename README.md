# Pontos Turísticos do Brasil 🌎

Projeto FullStack para cadastro e listagem de pontos turísticos do Brasil.

O projeto é composto por:

- **Back-end:** API construída em C#;
- **Banco de dados:** SQLite;
- **Front-end:** HTML, CSS e JavaScript.

## Pré-requisitos

- **[Visual Studio 2022](https://visualstudio.microsoft.com/pt-br/vs/)** (para compilar e executar a API)
- **[VSCode](https://code.visualstudio.com/download)**
- **[DB Browser for SQLite](https://sqlitebrowser.org/)**

## Estrutura do Projeto

```plaintext
pontos-turisticos/
            ├── /src                # Código do back-end
            ├── /frontend           # Código do front-end
            ├── PontosDatabase.db   # Arquivo do banco de dados SQLite
            └── README.md           # Este arquivo
```

## Configuração do Banco de Dados SQLite 💾

**Local do banco de dados**

O arquivo do banco de dados PontosDatabase.db encontra-se na raiz do projeto. Ele contém os dados necessários para os testes da API e já está pronto para uso.

**Conexão**

A conexão com o banco de dados SQLite é feita no arquivo `PontosDbContext.cs` dentro das pastas `src/PontosTuristicos.Infrastructure/PontosDbContext.cs`. O caminho para o banco de dados é especificado no método `OnConfiguring` da classe `PontosDbContext`:
```
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=INSIRA-AQUI-O-CAMINHO-PARA-O-BANCO-DE-DADOS\\pontos-turisticos\\PontosDatabase.db");
        }
```

**Testando a conexão**

Certifique-se de que o arquivo PontosDatabase.db esteja no local correto antes de iniciar a API. Para validar que a API está conectada ao banco, você pode testar o endpoint GET /api/Pontos para listar os pontos turísticos disponíveis.

## Documentação da API 📄

#### Cadastro de um ponto turístico

```http
  POST /api/Pontos
```

| Parâmetro     | Tipo     | Descrição        |
| :------------ | :------- | :--------------- |
| `name`        | `string` | **Obrigatório**. |
| `description` | `string` | **Opcional**     |
| `location`    | `string` | **Obrigatório**  |
| `city`        | `string` | **Obrigatório**  |
| `state`       | `string` | **Obrigatório**  |

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

- [Visual Studio IDE 2022 Download](https://visualstudio.microsoft.com/pt-br/vs/)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [DB Browser for SQLite Download](https://sqlitebrowser.org/)

## Como Executar o Projeto ▶️

**Back-end (API)**

- Abra o projeto no Visual Studio 2022.
- Certifique-se de que o arquivo PontosDatabase.db está no local correto (raiz do projeto).
- Compile e execute o projeto pressionando F5.
- Acesse o Swagger UI para testar os endpoints no navegador:

```
http://localhost:7076/swagger/index.html
```

**Front-end**

- Navegue até a pasta `frontend`.
- Abra o arquivo `index.html` em um navegador moderno (exemplo: Chrome, Edge).

## Observação Importante ℹ️

- A API está configurada para executar na porta **Http 7076** e **Https 7077**:

```
"Kestrel": {
    "Endpoints": {
        "Http": {
            "Url": "http://localhost:7076"
        },
        "Https": {
            "Url": "https://localhost:7077"
        }
    }
}
```

- Caso a porta padrão seja alterada no ambiente local (por outro processo usando a mesma porta ou configuração do sistema), será necessário ajustá-la manualmente no arquivo `appsettings.json` ou conferir a porta usada na saída do console ao iniciar o projeto.
