---
title: Kubernetes traffic splitting without Istio
description: Increase traffic to new app versions without Istio.
sidebar_position: 9
---

This topic describes how to progressively increase traffic to new application versions using Ingress resources, Harness [annotations](http://localhost:3000/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels), and the [Apply](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step) step.

For standard Canary and Blue/Green Kubernetes deployments, go to:

- [Create a Kubernetes canary deployment](create-a-kubernetes-canary-deployment.md)
- [Create a Kubernetes blue/green deployment](create-a-kubernetes-blue-green-deployment.md)

Harness uses Kubernetes [annotations](http://localhost:3000/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels) to ignore the Ingress manifests during the main deployment, and to specify weights for each Ingress resource (10, 30). Each Ingress resource is then applied using a separate Apply step. Finally, the full rollout is performed using a Harness Rolling Deploy step.

This technique can be use with blue/green and canary deployments. For this topic, we will modify standard Harness Kubernetes canary deployment.


## Manifests and values files for the deployment

For this example, we will use the public repo located at [https://github.com/michaelcretzman/istio-canary/tree/main/templates](https://github.com/michaelcretzman/istio-canary/tree/main/templates).

The files are also included below.

<details>
<summary>File structure</summary>

The files used in the example are organized as follows:

- templates
  - backend
    - 1-deployment.yaml
    - 2-service.yaml
    - 3-istio.yaml
  - frontend
    - ui.yaml
- values.yaml

</details>


<details>
<summary>templates/backend/1-deployment.yaml</summary>

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: {{.Values.namespace}}
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{.Values.name}}
spec:
  replicas: {{.Values.replicas}}
  selector:
    matchLabels:
      app: {{.Values.name}}
  template:
    metadata:
      labels:
        app: {{.Values.name}}
    spec:
      containers:
      - name: color
        image: {{.Values.image}}
        imagePullPolicy: IfNotPresent
        readinessProbe:
          httpGet:
            path: /color
            port: http
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          limits:
            cpu: 100m
            memory: 50Mi
          requests:
            cpu: 100m
            memory: 50Mi
        ports:
        - name: http
          containerPort: 80
```

</details>

<details>
<summary>templates/backend/2-service.yaml</summary>

```yaml
#
# Main service for incoming traffic
#
apiVersion: v1
kind: Service
metadata:
  name: {{.Values.name}}
spec:
  type: ClusterIP
  ports:
  - name: http
    port: 9080
    protocol: TCP
    targetPort: http
  selector:
    app: {{.Values.name}}
---
#
# Service targeting canary only
#
apiVersion: v1
kind: Service
metadata:
  name: {{.Values.canaryName}}
spec:
  type: ClusterIP
  ports:
  - name: http
    port: 9080
    protocol: TCP
    targetPort: http
  selector:
    app: {{.Values.name}}
    harness.io/track: canary
---
#
# Service targeting stable only
#
apiVersion: v1
kind: Service
metadata:
  name: {{.Values.stableName}}
spec:
  type: ClusterIP
  ports:
  - name: http
    port: 9080
    protocol: TCP
    targetPort: http
  selector:
    app: {{.Values.name}}
    harness.io/track: stable
```

</details>

<details>
<summary>templates/backend/3-istio.yaml</summary>

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: {{.Values.name}}
spec:
  selector:
    istio: ingressgateway # use Istio default gateway implementation
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: {{.Values.name}}
spec:
  host: {{.Values.name}}
  subsets:
  - labels:
      harness.io/track: canary
    name: canary
  - labels:
      harness.io/track: stable
    name: stable
---
#
# Main ingress for the backend that will split between stable and canary during deployment
#
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: {{.Values.name}}
spec:
  hosts:
  - "*"
  gateways:
  - {{.Values.name}}
  http:
  - match:
    - uri:
        exact: /{{.Values.endpoint}}
    rewrite:
      uri: /color/index.html
    route:
    - destination:
        host: {{.Values.name}}
        subset: stable
    {{- if .Values.splitTraffic}}
      weight: {{.Values.stableWeight}}
    - destination:
        host: {{.Values.name}}
        subset: canary
      weight: {{.Values.canaryWeight}}
    {{- end}}
---
#
# Dedicated ingress for canary
#
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: {{.Values.canaryName}}
spec:
  hosts:
  - "*"
  gateways:
  - {{.Values.name}}
  http:
  - match:
    - uri:
        exact: /{{.Values.canaryEndpoint}}
    rewrite:
      uri: /color/index.html
    route:
    - destination:
        host: {{.Values.canaryName}}
---
#
# Dedicated ingress for stable
#
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: {{.Values.stableName}}
spec:
  hosts:
  - "*"
  gateways:
  - {{.Values.name}}
  http:
  - match:
    - uri:
        exact: /{{.Values.stableEndpoint}}
    rewrite:
      uri: /color/index.html
    route:
    - destination:
        host: {{.Values.stableName}}
```

</details>

<details>
<summary>templates/frontend/ui.yaml</summary>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{.Values.frontend.uiPath}}
  annotations:
    harness.io/direct-apply: true
spec:
  replicas: 1
  selector:
    matchLabels:
      app: {{.Values.frontend.uiPath}}
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: {{.Values.frontend.uiPath}}
    spec:
      terminationGracePeriodSeconds: 2
      containers:
      - name: color-ui
        image: {{.Values.frontend.image}}
        imagePullPolicy: IfNotPresent
        env:
        - name: LOAD_BALANCER
          value: {{.Values.frontend.loadBalancer}}
        - name: ENDPOINT
          value: {{.Values.endpoint}}
        - name: TARGET1
          value: {{.Values.canaryEndpoint}}
        - name: TARGET2
          value: {{.Values.stableEndpoint}}
        - name: TITLE
          value: {{.Values.frontend.title}}
        - name: UI_PATH
          value: {{.Values.frontend.uiPath}}
        ports:
        - name: http
          containerPort: 80
          protocol: TCP
        resources:
          limits:
            memory: 50Mi
            cpu: 10m
          requests:
            memory: 50Mi
            cpu: 10m
---
apiVersion: v1
kind: Service
metadata:
  name: {{.Values.frontend.uiPath}}
spec:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: http
  selector:
    app: {{.Values.frontend.uiPath}}
  type: ClusterIP
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: {{.Values.frontend.uiPath}}
spec:
  hosts:
  - "*"
  gateways:
  - {{.Values.name}}
  http:
  - match:
    - uri:
        prefix: /{{.Values.frontend.uiPath}}
    rewrite:
      uri: /
    route:
    - destination:
        host: {{.Values.frontend.uiPath}}
```

</details>

<details>
<summary>templates/values.yaml</summary>

```yaml
name: <+service.variables.name>
image: <+artifact.image>
canaryName: <+service.variables.canaryName>
stableName: <+service.variables.stableName>
endpoint: color
canaryEndpoint: color-canary
stableEndpoint: color-stable
splitTraffic: false

replicas: 2
namespace: <+infra.namespace>

frontend:
  title: Istio - Canary
  loadBalancer: <+service.variables.loadBalancer>
  uiPath: <+service.variables.uiPath>
  image: us.gcr.io/sales-209522/continuous-requests:110
```

</details>


## Create the Harness service

The Harness service will contain the locations of the manifests, values file, and artifact for deployment.

In addition, the service will contain several variables that are used in the values file so you can customize names.

Here is the YAML for an example Harness service. You will need to update it with your own Harness connectors (`connectorRef`), artifact (`imagePath`), and load balancer (`loadBalancer`) URL.

<details>
<summary>Harness service YAML</summary>

```yaml
service:
  name: Istio Canary
  identifier: Istio_Canary
  gitOpsEnabled: false
  serviceDefinition:
    type: Kubernetes
    spec:
      manifests:
        - manifest:
            identifier: istio-canary
            type: K8sManifest
            spec:
              store:
                type: Github
                spec:
                  connectorRef: ID
                  gitFetchType: Branch
                  paths:
                    - templates/backend
                    - templates/frontend
                  repoName: istio-canary
                  branch: main
              valuesPaths:
                - templates/values.yaml
              skipResourceVersioning: false
      artifacts:
        primary:
          spec:
            connectorRef: ID
            imagePath: IMAGE_PATH
            tag: <+input>
            registryHostname: HOSTNAME
          type: Gcr
      variables:
        - name: canaryName
          type: String
          value: colors-canary
        - name: loadBalancer
          type: String
          value: URL
        - name: name
          type: String
          value: colors
        - name: stableName
          type: String
          value: colors-stable
        - name: uiPath
          type: String
          value: istio-canary
```

</details>

## Create the Harness environment and infrastructure definition



## Create the deployment strategy and steps





