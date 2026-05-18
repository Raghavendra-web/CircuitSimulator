# Cognizant Company Application

A basic Java programming project for a company-style application. The app models a small Cognizant delivery team with employees, departments, projects, and assignment logic.

## Features

- Register employees with role, department, and annual salary.
- Create client delivery projects with budgets.
- Assign employees to projects.
- Generate a simple company summary from the console app.
- Unit test the core service behavior with JUnit 5.

## Project Structure

```text
src/main/java/com/cognizant/app
├── CognizantCompanyApplication.java
├── model
│   ├── Department.java
│   ├── Employee.java
│   └── Project.java
└── service
    └── CompanyService.java
```

## Requirements

- Java 17 or later
- Maven 3.9 or later

## Build and Test

```bash
mvn test
mvn package
```

## Run

```bash
java -jar target/cognizant-company-application-1.0.0.jar
```

The application prints a sample Cognizant company dashboard showing departments, projects, assigned associates, and salary totals.
