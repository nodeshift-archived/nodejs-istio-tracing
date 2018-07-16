# Istio Distributed Tracing Mission for Node.js

## Purpose

Showcase Distributed Tracing in Istio with Jaeger in Node.js applications

## Prerequisites

* Docker installed and running
* OpenShift and Istio environment up and running (See https://github.com/openshift-istio/istio-docs/blob/master/user-journey.adoc for details)

## Launcher Flow Setup

If the Booster is installed through the Launcher and the Continuous Delivery flow, no additional steps are necessary.

Skip to the _Use Cases_ section.

## Local Source to Image Build (S2I)

### Prepare the Namespace

Create a new namespace/project:
```
oc new-project <whatever valid project name you want>
```

### Build and Deploy the Application

#### With Source to Image build (S2I)

Run the following commands to apply and execute the OpenShift templates that will configure and deploy the applications:
```bash
find . | grep openshiftio | grep application | xargs -n 1 oc apply -f

oc new-app --template=nodejs-istio-tracing-greeting-service -p SOURCE_REPOSITORY_URL=https://github.com/bucharest-gold/nodejs-istio-tracing -p SOURCE_REPOSITORY_REF=master -p SOURCE_REPOSITORY_DIR=greeting-service
oc new-app --template=nodejs-istio-tracing-cute-name-service -p SOURCE_REPOSITORY_URL=https://github.com/bucharest-gold/nodejs-istio-tracing -p SOURCE_REPOSITORY_REF=master -p SOURCE_REPOSITORY_DIR=cute-name-service
```

## Use Cases

Any steps issuing `oc` commands require the user to have run `oc login` first and switched to the appropriate project with `oc project <project name>`.

### Create and view application traces

1. Create a Gateway and Virtual Service in Istio so that we can access the service within the Mesh:
    ```
    oc apply -f istio-config/gateway.yaml
    ```
2. Retrieve the URL for the Istio Ingress Gateway route, with the below command, and open it in a web browser.
    ```
    echo http://$(oc get route istio-ingressgateway -o jsonpath='{.spec.host}{"\n"}' -n istio-system)/nodejs-istio-tracing
    ```
3. The user will be presented with the web page of the Booster
4. Click the "Invoke" button. You should see a "cute" hello message appear in the result box.
5. Follow the instructions in the webpage to access the Jaeger UI to view the application traces.
