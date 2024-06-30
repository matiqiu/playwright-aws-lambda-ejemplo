# Playwright con AWS Lambda

Autor: Matías Gómez Cartes - [matiqiu](https://github.com/matiqiu)

Este es un proyecto de ejemplo para correr múltiples pruebas automatizadas con Playwright, ejecutándose mediante AWS Lambda.

## Manual

### Requerimientos
- [Docker](https://www.docker.com/)
- [AWS Command Line Interface](https://aws.amazon.com/cli/)

### Docker

#### Crear imagen de Docker
```sh
docker build -t playwright-aws-lambda-ejemplo:latest .

Correr contenedor
```
docker run -p 9000:8080 playwright-aws-lambda-ejemplo:latest
```

Invocar contenedor
```
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```

Implementación en AWS Lambda
(Reemplazar YOUR_AWS_ACCOUNT_ID por las credenciales de su cuenta de AWS)

Crear repositorio en AWS ECR (Elastic Container Registry)
```
aws ecr create-repository --repository-name playwright-aws-lambda-ejemplo --image-scanning-configuration scanOnPush=true
```

Etiquetar la imagen de Docker para el repositorio ECR
```
docker tag playwright-aws-lambda-ejemplo:latest YOUR_AWS_ACCOUNT_ID.dkr.ecr.eu-west-1.amazonaws.com/playwright-aws-lambda-ejemplo:latest
```

Login en ECR
```
aws ecr get-login-password | docker login --username AWS --password-stdin YOUR_AWS_ACCOUNT_ID.dkr.ecr.eu-west-1.amazonaws.com
```

Enviar imagen de Docker a ECR
```
docker push YOUR_AWS_ACCOUNT_ID.dkr.ecr.eu-west-1.amazonaws.com/playwright-aws-lambda-ejemplo:latest
```

Finalmente, crea e implementa una función AWS Lambda con la imagen de contenedor recién creada y listo.