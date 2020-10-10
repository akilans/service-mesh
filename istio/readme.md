[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fakilans%2Fservice-mesh%2Ftree%2Fmain%2Fistio&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# Istio Service Mesh

### Prerequisites

- Minikube or Working k8s cluster
- kubectl

### Istioctl Setup

There is an addons for installing istio on minikube but am ignoring it now.
Following the real world installation scenario.

```bash
# Way to add istio on minikube but i am skipping
minikube addons list
minikube addons enable istio
```

The following command downloads the istioctl with sample application and manifest
Don't worry, i am not using default sample application. We won't learn much from sample application
We will bring our own application

#### Demo App Architecture

![Books Store Web - Books API - Reviews API - Python BOT ](https://github.com/akilans/service-mesh/blob/main/images/svc-mesh.png?raw=true)

```bash
curl -L https://istio.io/downloadIstio | sh -
sudo mv istio-1.7.3/bin/istioctl /usr/local/bin/
sudo chmod +x /usr/local/bin/istioctl
istioctl version
istioctl --help
istioctl x precheck # precheck the cluster
```

### Istio setup on K8S cluster

There are many profile while installing istio on k8s cluster
We will go with demo which is not recommended for production
default profile is recommended for production [ we will explore later ]
[Reference](https://istio.io/latest/docs/setup/additional-setup/config-profiles/)

The below commands creates

- namespace istio-system
- pod istiod
- pod ingress and egress gateway

```bash
istioctl install --set profile=demo
<< 'MULTILINE-COMMENT'
    ✔ Istio core installed
    ✔ Istiod installed
    ✔ Egress gateways installed
    ✔ Ingress gateways installed
    ✔ Installation complete
MULTILINE-COMMENT
# Change the sevice type from LoadBalancer to NodePort as we don't have LoadBalancer
kubectl edit svc -n istio-system istio-ingressgateway
kubectl get svc -n istio-system # Confirm the svc
```

### Deploy our own Bookstore App

```bash
kubectl create ns book-demo
kubectl label ns book-demo istio-injection=enabled
kubectl get ns book-demo --show-labels #confirm the label
kubectl apply -f k8s/app-manifest -n book-demo
kubectl get pods -n book-demo # confirm all the pods running with 2 containers
kubectl get svc -n book-demo # All services are ClusterIP so we can't access it directly
```

### Deploy Gateway and Virtualservice

```bash
kubectl apply -f k8s/gateway.yaml -n book-demo # It has gateway and virtualservice
kubectl get svc -n istio-system  # get istio-ingressgateway nodeport
# Access the app by $MINIKUBE_IP:NODEPORT
```

### Install Dashboards [ Kiali, Prometheus, Grafana]

```bash
kubectl apply -f dashboards/addons/
istioctl dashboard grafana # http://localhost:3000/dashboard/db/istio-workload-dashboard
istioctl dashboard kiali
istioctl dashboard prometheus
```

### Traffic Routing

-
