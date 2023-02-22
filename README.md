# Next.js Demo on AWS 

Tech stack:

- Next.js
- NextAuth.js
- AWS App Runner
- Amazon Cognito
- DynamoDB

# Deployment

Use `ServiceName` instead of `SerivceArn`:
```sh
$ aws apprunner create-service --cli-input-json file://apprunner-cli-create-service.json
```

```sh
$ aws apprunner update-service --cli-input-json file://apprunner-cli-create-service.json
```

```sh
./deploy.sh <Your AWS Account ID> <Image Name>
```
