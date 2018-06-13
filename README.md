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

### Create and view application traces

1. Retrieve the URL for the Istio Ingress route, with the below command, and open it in a web browser.
    ```
    echo http://$(oc get route istio-ingress -o jsonpath='{.spec.host}{"\n"}' -n istio-system)/
    ```
2. The user will be presented with the web page of the Booster
3. Click the "Invoke" button. You should see a "cute" hello message appear in the result box.
4. Follow the instructions in the webpage to access the Jaeger UI to view the application traces.
