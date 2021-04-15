[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fakilans%2Fservice-mesh%2Ftree%2Fmain%2Flinkerd&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# Service Mesh - Linkerd
  
  ![LinkerD Logo ](https://github.com/akilans/service-mesh/blob/main/images/Linkerd_logo.png?raw=true)

### Prerequisite

- Ubuntu host machine [ minikube ]
- Running kubernetes cluster [ 1.18 ]
- Kubectl cli with kubernetes cluster

### LinkerD components

- Linkerd-proxy written in Rust. It is not using envoy which is used by istio and written in golang. observability, security, and reliability features are a direct function of the data plane 

- Linkerd- control plane - written in Golang
    - Proides api endpoint
    - service discovery information for routing requests
    - Acts as a certificate authority and issues TLS identities to the proxies
    - Proxy injetor - automatically adds the Linkerd proxy as a sidecar to pods when appropriate
    - Web based UI written in node and reactjs
    - Grafana and Prometheus

### Linkerd Installation

```bash
# For windows download the correct package
wget https://github.com/linkerd/linkerd2/releases/download/stable-2.8.1/linkerd2-cli-stable-2.8.1-linux
sudo chmod +x linkerd2-cli-stable-2.8.1-linux
sudo mv linkerd2-cli-stable-2.8.1-linux /usr/local/bin/linkerd
linkerd version
linkerd check --pre # validate kbs cluster
linkerd install | kubectl apply -f -
linkerd check # checks linkerd health
linkerd dashboard & # Open grafana dashboard
linkerd -n linkerd top deploy/linkerd-web # Monitor via cmd line
```

### Deploy Books App [ Our Own App ]

#### Demo App Architecture

![Books Store Web - Books API - Reviews API - Python BOT ](https://github.com/akilans/service-mesh/blob/main/images/svc-mesh.png?raw=true)

###### Without LinkerD
```bash
kubectl apply -f demo.yaml # Create a namespace with annotaions : linkerd.io/inject: enabled
kubectl apply -f .

linkerd dashboard # There will no metrics for demo app
```

###### Enable LinkerD
```bash
kubectl annotate ns demo linkerd.io/inject=enabled
kubectl rollout restart deploy -n demo
linkerd dashboard # metrics is avaiable for demo app
```

### Deploy Own service - Method 1 [ Optional ]

```bash
kubectl create deployment my-apache --image=httpd
kubectl expose deployment my-apache --type=ClusterIP --port=80
kubectl get deploy -o yaml | linkerd inject - | kubectl apply -f -
```

### Deploy own service with LinkerD - Method 2 [ Optional ]

- annotating the namespace, deployment, or pod with the `linkerd.io/inject: enabled` Kubernetes annotation, which will trigger automatic proxy injection when the resources are created.

### Linkerd Commands
```bash
linkerd tap deployment/sm-book-web --namespace demo # live traffic stream 
linkerd top deployment/sm-book-web --namespace demo # live metrics
watch linkerd stat deployments -n demo # Overall stat
```

### Uninstall Linkerd

```bash
# From Data plane - Remove annotation from deployment
# linkerd.io/inject: disabled
# From control plane
linkerd uninstall | kubectl delete -f -
```

### Tips - Delete ns if it stuck

- kubectl get namespace demo -o json > demo.json
- remove 'kubernetes' from finalizers
- kubectl replace --raw "/api/v1/namespaces/demo/finalize" -f ./demo.json
