
# Marina's Recipes Cookbook 👩‍🍳🥘

This project aims to demonstrate the DevOps process of developing, building, testing and deploying a frontend app.

## Project Introduction
This is a **React+Vite+SWC (TypeScript)** project. It is a simple SPA that lists a bunch of recipes that the user can review. 
### UI Reference

UI components library used in the project is [Mantine](https://mantine.dev/).
### API Reference
The REST API is open-source - [DummyJSON](https://github.com/Ovi/DummyJSON). The endpoints, used in this project are:
#### Get all recipes

```bsh
   GET/ https://dummyjson.com/recipes
```

#### Get recipe by id

```bash
   GET/ https://dummyjson.com/recipes/${recipeId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `recipeId`      | `number` | **Required**. Id of item to fetch |



## Used technologies

- ***React + TypeScript*** - used for development in the project
- ***Jest*** - a library for writing unit tests in the project
- ***ESlint*** - linter, analyses static code for catching errors, enforcing coding standards and identifying potential issues
- ***Prettier*** - formatter, makes the code ✨ **𝓅𝓇ℯ𝓉𝓉𝓎** ✨
- ***SonarQube Cloud (SonarCloud)*** - code analysis tool designed to detect coding issues
- ***Docker*** - container virtualization platform
- ***Trivy*** - vulnerability scanner for containers and other artifacts
- ***Kubernetes*** - a container orchestration platform
- ***Minikube*** -  tool that allows you to run a local Kubernetes cluster


## Run Locally 🏃‍♂️
This section contains different commands - **[ones that run internally in the React project, without interfering with the Docker concepts](#actions-in-react-project---test-format-lint-build-run)**, and **[others that are needed to Dockerize the app and deploy it](#how-to-start-the-project-using-docker-and-minikube-locally)**. **To perform any of the steps listed below you need to setup the project locally.**

### How to setup the project locally?

- Clone the project

```bash
  git clone https://github.com/mar-ina-17/recipes-book.git
```

- Go to the project directory

```bash
  cd recipes-book
```

- Install dependencies

```bash
  npm install
```

### **How to start the project using Docker and Minikube locally? 🐳**

This is a step by step guide on how to run the project. There is also a video attached in the end of this section.

- **Build Docker image**

```bash
  docker build -t recipes-book:latest .
```

- **Start Minikube (checking the status is optional, it can be checked in Docker desktop app)**

```bash
  minikube start
  minikube status
```
- **Apply Kubernetes manifest**

```bash
  kubectl apply -f k8s/deployment.yaml
  kubectl apply -f k8s/service.yaml
```
- **Check the status of the resources**

```bash
  kubectl get pods 
  kubectl get deployments
  kubectl get services
```
_❗The pods must be in "Running" state and the deployment must have the desired number of replicas. Ensure your service is listed, and the CLUSTER-IP or NODE-PORT is available.
Otherwise something is wrong...😿_

- **Access the Application**

```bash
  minikube service recipes-book-service
```
✅ This should open a new window in your browser with the runing applcation. 

#### 🎬 Visual guide on how to start application (the quality is very bad, but the assets size limitation is 10MB)

https://github.com/user-attachments/assets/d015606f-6f8e-41e8-8f1d-6758d9f766f8

### ⛔ To stop the application:

- **Delete the Deployment and Service**
```bash
kubectl delete -f k8s/deployment.yaml
kubectl delete -f k8s/service.yaml
```
- **Verify Resources Are Removed**
```bash
kubectl get all
```
- **Stop Minikube**
```bash
minikube stop
```
- **Delete Minikube Cluster (Optional). If you want to completely remove the Minikube environment:**
```bash
minikube delete
```
- **List Containers or acces them through Docker Desktop, to retrieve ```container-id```**
```bash
docker ps
```
- **Stop Docker container**
```bash
docker stop <container-id>
```
- **Remove the Container (Optional):**
```bash
docker rm <container-id>
```

- **Cleanup Docker image - if you no longer need it:**
```bash
docker rmi recipes-book:latest
```


<hr>

### Actions in React project - test, format, lint, build, run ⚛️


#### How to run app locally?
```bash
  npm run dev
```
#### How to build project locally?
```bash
  npm run build
```
#### How to test app locally? (Jest)
```bash
  npm test
```
#### How to run linter? (ESlint)
```bash
  npm run lint
```
#### How to run formatter? (Prettier)
```bash
  npm run format
```

## CI/CD Pipeline 🚀

This section will describe the main idea of the project - to show the process of CI/CD. 

### Job 1: **ProjectActions**
Prepares the project for deployment. It checks out the repository, sets up Node.js, installs dependencies, runs tests, lints the code, formats it, and builds the project. It ensures the code is functional, high-quality, and production-ready.

### Job 2: **SonarCloudScan**
Analyzes the code's quality and security using SonarCloud. It checks out the repository, sets up Node.js, installs dependencies, and scans the code for bugs, vulnerabilities, and code smells to maintain high standards.

### Job 3: **DockerActions**
Containerizes the application. It builds a Docker image, scans it with Trivy for vulnerabilities, and, if secure, pushes it to Docker Hub. This ensures the application is portable, secure, and ready for deployment.

### Job 4: **Minikube**
Simulates deployment to Kubernetes. It sets up a Minikube cluster, pulls the Docker image, applies Kubernetes manifests `(service.yaml and deployment.yaml)` , and deploys the application. Finally, it stops the Minikube cluster, ensuring deployment compatibility.

<img width="804" alt="Screenshot 2025-01-02 at 18 54 40" src="https://github.com/user-attachments/assets/34ee1f04-d0d1-478f-8788-31edc5795848" />


