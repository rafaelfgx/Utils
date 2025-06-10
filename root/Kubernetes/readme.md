# Kubernetes

## Install

* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* [Rancher Desktop](https://rancherdesktop.io)
* [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli-windows)

## Local

* **Run:** docker run -p PORT:CONTAINER_PORT -d --name CONTAINER IMAGE
* **Compose:** docker compose up --build -d

## Docker Build and Push Image

### Docker Hub

1. docker build . --file FILE --tag USER/IMAGE
2. docker tag USER/IMAGE USER/IMAGE:VERSION
3. docker login
4. docker push --all-tags USER/IMAGE

### Generic Registry

1. docker build . --file FILE --tag REGISTRY/PROJECT/IMAGE
2. docker tag REGISTRY/PROJECT/IMAGE REGISTRY/PROJECT/IMAGE:VERSION
3. docker login https://REGISTRY
4. docker push --all-tags REGISTRY/PROJECT/IMAGE

## Kubctl

* **Get Contexts:** kubectl config get-contexts
* **Set Current Context:** kubectl config use-context CONTEXT
* **Set Current Namespace:** kubectl config set-context --current --namespace=NAMESPACE
* **Apply File:** kubectl apply -f FILE.yml
* **Apply Files Within Directory:** kubectl apply -f DIRECTORY
* **Restart Deployment:** kubectl rollout restart deploy DEPLOYMENT
* **Get All:** kubectl get all
* **Delete All In Namespace:** kubectl delete all --all -n NAMESPACE
* **Delete Namespace:** kubectl delete namespace NAMESPACE
* **Logs Deployment:** kubectl logs -f deploy/DEPLOYMENT
* **Logs Pod:** kubectl logs -p POD
* **Logs:** kubectl logs --all-containers=true --selector app=APP --since=1h --tail=-1 > C:\Log.txt

## Helm

* **Create:** helm create NAME
* **Install:** helm install NAME
* **Upgrade:** helm upgrade NAME
* **Uninstall:** helm uninstall NAME
* **List:** helm list
* **Status:** helm status NAME
* **Search:** helm search TERM
* **Add Repository:** helm repo add REPOSITORY_NAME REPOSITORY_URL
* **Update Repository:** helm repo update

## Azure

* **Install Azure Kubernetes CLI:** az aks install-cli
* **Set Subscription:** az account set --subscription SUBSCRIPTION
* **Connect Azure Kubernetes Service:** az aks get-credentials --resource-group RESOURCE_GROUP --name CLUSTER_NAME --admin
* **Export Azure Kubernetes Service Configuration:** az aks get-credentials --resource-group RESOURCE_GROUP --name CLUSTER_NAME --admin --file FILE
* **Create Azure Credentials:** az ad sp create-for-rbac --name NAME --role contributor --scopes /subscriptions/SUBSCRIPTION/resourceGroups/RESOURCE_GROUP --sdk-auth
