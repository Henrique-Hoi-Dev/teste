# Mirae - Portal Público

## Como rodar o projeto em modo de desenvolvimento

- Adicione a url do servidor do STRAPI no .env

```env
NEXT_PUBLIC_STRAPI_URL = http://strapiserver.com
```

- Rode o seguinte comando no terminal

```bash
npm run dev
# or
yarn dev
```

- Ambiente Produtico

```bash
npm run start
# or
yarn start
```

O projeto roda por padrão na url [http://localhost:3000](http://localhost:3000)

## Build

### Para fazer o build siga os seguintes passos

- Adicionar as seguinte variaveis de ambiente

```env
NEXT_PUBLIC_STRAPI_URL = http://strapiserver.com/api
NEXT_PUBLIC_STRAPI_URL_MIRAE_FUNDS= <Url da api de fundos>
NEXT_PUBLIC_MIRAE_API_URL= <Url das api's de mirae, é usada na consulta de IPO>
MY_SECRET_TOKEN= <Token utilizado na api's de revalidação de página do NEXTJS>
```

- O projeto roda por padrão na porta 5000, se for necessário mudar a porta, vá para o dockerfile e mude as seguintes linhas

```dockerfile
52 EXPOSE CUSTOM_PORT
53 ENV PORT CUSTOM_PORT
```

- Rode o seguinte comando para fazer o build da aplicação

```bash
docker build -t nextjs-docker .
```

### Para rodar o container

```bash
docker run -p 3000:5000 nextjs-docker

Sendo que os valores da porta podem ser customizados

docker run -p {PORTA_NA_MAQUINA_LOCAL}:{PORTA_DO_DOCKER}  nextjs-docker
```
