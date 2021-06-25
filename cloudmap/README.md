# AWS Cloud Map with AWS ECS

### Prerequisite

- Docker
- Docker-compose
- AWS account
- Dockerhub account
- AWS cli

### AWS CloudMap

- AWS Cloud Map is a managed solution that you can use to map logical names to the resources for an application. In our case it is ECS service
- Namespace is a logical grouping of services.
- AWS Cloud Map automatically creates an Amazon Route 53 public or private hosted zone that has the same name as the namespace.
-

### Application Architecture

![App architecture ](https://github.com/akilans/service-mesh/blob/main/images/architecture.png?raw=true)

### Application Architecture with AWS ECS/Cloudmap

![App architecture with AWS ECS/Cloudmap](https://github.com/akilans/service-mesh/blob/main/images/cloud-map.png?raw=true)

### Docker images

- review - akilan/sm-review-api:v3 (port - 7000)
- books - akilan/sm-books-api:v3 (port - 5000 )
- web - akilan/sm-web:v3 (port - 3000 )

### Steps

- Run bookstore app in local [Reference link](https://github.com/akilans/service-mesh/tree/main/demo-apps)
- Create ECS fargate cluster
- Create Application Load Balancer[ALB]
- Create task definition for review and book
- Create service for review and book with service discovery
- Create task definition for web with correct env
- Create service for web with alb
- Access the ALB
- Check Route53

### ECS Exec for Fargate Cluster

- [Link](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html)

```bash

aws ecs describe-tasks \
    --cluster cloudmap-demo \
    --tasks f13b0d9fd55040fcbbbf88aac8c56c56

aws ecs update-service \
  --cluster cloudmap-demo \
  --service web-svc \
  --task-definition sd-web-td:2 \
  --force-new-deployment \
  --enable-execute-command

aws ecs execute-command --cluster cloudmap-demo \
    --task d93100b45a32498b9ea0c6f9294b983b \
    --container web \
    --interactive \
    --command "/bin/sh"

```
