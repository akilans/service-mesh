# AWS Cloud Map with AWS ECS

### Prerequisite

- Docker
- Docker-compose
- AWS account
- Dockerhub account

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
