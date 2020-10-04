# Service Mesh - Linkerd

### Prerequisite

- Ubuntu host machine
- Running kubernetes cluster
- Kubectl cli with kubernetes cluster

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

```bash
kubectl apply -f .
kubectl get deploy -n demo -o yaml \
  | linkerd inject - \
  | kubectl apply -f -
```

### Deploy Sample Application

```bash
curl -sL https://run.linkerd.io/emojivoto.yml | kubectl apply -f -
kubectl get svc -n emojivoto
kubectl get pods -n emojivoto
kubectl -n emojivoto port-forward svc/web-svc 8080:80
# Inject linkerd on all deployments
# It will terminate the old pods and create pods with sidecar [linkerd-proxy]
kubectl get -n emojivoto deploy -o yaml | linkerd inject - | kubectl apply -f -
# Show metrics in cli
linkerd -n emojivoto stat deploy
```

### Deploy Own service - Method 1

```bash
kubectl create deployment my-apache --image=httpd
kubectl expose deployment my-apache --type=ClusterIP --port=80
kubectl get deploy -o yaml | linkerd inject - | kubectl apply -f -
```

### Deploy own service with LinkerD - Method 2

- annotating the namespace, deployment, or pod with the `linkerd.io/inject: enabled` Kubernetes annotation, which will trigger automatic proxy injection when the resources are created.

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
