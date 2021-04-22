[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fakilans%2Fservice-mesh&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# Service Mesh

[Service Mesh category](https://landscape.cncf.io/card-mode?category=service-mesh&grouping=category)

- Linkerd
- Consul
- Istio


#### Example

- The above image illustrates a distributed application without a service mesh for observability and security. We can see that there are services communicating with each other, but we don't know anything about that communication.

![Example Microservice app without service mesh ](https://github.com/akilans/service-mesh/blob/main/images/ms-without-sm.png?raw=true)

#### Problem with Language specific library

- Netflix developed Hystrix, Google developed the Stubby libraries, and Twitter developed a library called Finagle

- Each library was specific to a language or runtime, making it difficult to handle polyglot microservices. Additionally, because the libraries were linked into the application, upgrading the functionality of the libraries required redeploying every service that made use of it. Finally, these libraries were often invasive: a service developer would need to ensure that every call to other microservices was made through the library


#### Service Mesh Concepts

- Service mesh works in platform layer not in application layer. It is language independent. This means that, regardless of the language of libraries that the application is written in[no need to change code], the service mesh provides the same set of features

- It implemented as a set of proxies that are deployed alongside the application, called the data plane, as well as a set of controlling logic deployed outside the application, called the control plane.

- The data plane observes and manages the communication between services, and the control plane provides the operator with the API and UI for managing those proxies as a whole.

- observability, security, and reliability features are a direct function of the data plane

- It provides success rates and latencies for services by measuring the traffic to each service. 

#### # 3 categories of service mesh
- Observability [latency,Traffic,Error,]
    - Collecting real-time telemetry from the system to infer the health of each of the services.
- Security
    - Ensuring that communication between services is confidential, authenticated, and authorized.
    - The application may run on a shared resource environment, like a cloud provider, where there is no direct control of the underlying hardware or network

    ![Example Microservice app with/without mTLS ](https://github.com/akilans/service-mesh/blob/main/images/ms-security-mtls.png?raw=true)

- Reliability [Retries, Timeout, Load Balancing based on latency, Traffic shifting for blue/green deployment]
    - Ensuring that overall application health is maximized, even in the face of partial failures.

