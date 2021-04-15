[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fakilans%2Fservice-mesh&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# Service Mesh

[Service Mesh category](https://landscape.cncf.io/card-mode?category=service-mesh&grouping=category)

- Linkerd
- Consul
- Istio

#### What we learn

- Explain what a service mesh is and where it fits into your application architecture.
- Understand the history of the service mesh.
- Name the three key concepts which drive service mesh functionality.
- Describe the "Golden Signals" of service health.
- Explain the value of mutual TLS.
- Describe the difference between the control plane and the data plane.

#### Concepts

- Service mesh works in platform layer not in application layer. It is language independent. This means that, regardless of the language of libraries that the application is written in[no need to change code], the service mesh provides the same set of features

- It implemented as a set of proxies that are deployed alongside the application, called the data plane, as well as a set of controlling logic deployed outside the application, called the control plane.

- The data plane observes and manages the communication between services, and the control plane provides the operator with the API and UI for managing those proxies as a whole.

- observability, security, and reliability features are a direct function of the data plane

- It provides success rates and latencies for services by measuring the traffic to each service. 

#### Example

- The above image illustrates a distributed application without a service mesh for observability and security. We can see that there are services communicating with each other, but we don't know anything about that communication.

![Example Microservice app without service mesh ](https://github.com/akilans/service-mesh/blob/main/images/ms-without-sm.png?raw=true)

#### Problem with Language specific library

- Netflix developed Hystrix, Google developed the Stubby libraries, and Twitter developed a library called Finagle

- Each library was specific to a language or runtime, making it difficult to handle polyglot microservices. Additionally, because the libraries were linked into the application, upgrading the functionality of the libraries required redeploying every service that made use of it. Finally, these libraries were often invasive: a service developer would need to ensure that every call to other microservices was made through the library

#### # 3 categories of service mesh
- Observability [latency,Traffic,Error,]
    - Collecting real-time telemetry from the system to infer the health of each of the services.
- Security
    - Ensuring that communication between services is confidential, authenticated, and authorized.
    - The application may run on a shared resource environment, like a cloud provider, where there is no direct control of the underlying hardware or network

    ![Example Microservice app with/without mTLS ](https://github.com/akilans/service-mesh/blob/main/images/ms-security-mtls.png?raw=true)

- Reliability [Retries, Timeout, Load Balancing based on latency, Traffic shifting for blue/green deployment]
    - Ensuring that overall application health is maximized, even in the face of partial failures.

### What is Service Mesh

Bunch of userspace proxies, stuck “next” to your services, plus a set of management processes. The proxies are referred to as the service mesh’s data plane, and the management processes as its control plane. The data plane intercepts calls between services and “does stuff” with these calls; the control plane coordinates the behavior of the proxies, and provides an API for you, the operator, to manipulate and measure the mesh as a whole.

#### Control plane

These services accomplish various things—aggregating telemetry data, providing a user-facing API, providing control data to the data plane proxies, etc. Together, they drive the behavior of the data plane

#### Data plane

Consists of transparent proxies that are run next to each service instance. These proxies automatically handle all traffic to and from the service. Because they're transparent, these proxies act as highly instrumented out-of-process network stacks, sending telemetry to, and receiving control signals from, the control plane.

