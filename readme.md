[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fakilans%2Fservice-mesh&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# Service Mesh

- Linkerd
- Consul
- Istio

### What is Service Mesh

Bunch of userspace proxies, stuck “next” to your services, plus a set of management processes. The proxies are referred to as the service mesh’s data plane, and the management processes as its control plane. The data plane intercepts calls between services and “does stuff” with these calls; the control plane coordinates the behavior of the proxies, and provides an API for you, the operator, to manipulate and measure the mesh as a whole.

#### Control plane

These services accomplish various things—aggregating telemetry data, providing a user-facing API, providing control data to the data plane proxies, etc. Together, they drive the behavior of the data plane

#### Data plane

Consists of transparent proxies that are run next to each service instance. These proxies automatically handle all traffic to and from the service. Because they're transparent, these proxies act as highly instrumented out-of-process network stacks, sending telemetry to, and receiving control signals from, the control plane.
