# Employee CRUD Application

This is a full-stack Employee Management (CRUD) application, built with Spring Boot for the backend API and Angular for the dynamic frontend user interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Database Setup (MySQL with XAMPP)](#database-setup-mysql-with-xampp)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

* **Add New Employee:** Create new employee records with details like name, email, department, etc.
* **View All Employees:** List all existing employee records.
* **Update Employee:** Modify details of an existing employee.
* **Delete Employee:** Remove employee records from the system.
* **RESTful API:** Robust and well-defined RESTful API for seamless communication between frontend and backend.
* **Modern UI:** Responsive and intuitive user interface built with Angular.

## Technologies Used

### Backend

* **Spring Boot:** Framework for building the RESTful API.
* **Java Development Kit (JDK) 17:** The Java runtime environment.
* **Spring Data JPA:** For database interaction and ORM.
* **Maven:** Dependency management and build tool.
* **MySQL:** Relational database for persistent storage.

### Frontend

* **Angular 20:** Framework for building the single-page application (SPA).
* **TypeScript:** Superset of JavaScript used by Angular.
* **Angular CLI:** Command-line interface for Angular development.
* **HTML5 & CSS3:** For structuring and styling the web pages.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Java Development Kit (JDK) 17 or higher**
    * [Download JDK 17](https://www.oracle.com/java/technologies/downloads/)
* **Maven 3.6.0 or higher**
    * [Download Maven](https://maven.apache.org/download.cgi)
* **Node.js (LTS version recommended)**
    * [Download Node.js](https://nodejs.org/en/download/) (Includes npm)
* **npm (Node Package Manager) - usually comes with Node.js**
* **Angular CLI:**
    ```bash
    npm install -g @angular/cli
    ```
* **XAMPP:** For running MySQL and Apache server.
    * [Download XAMPP](https://www.apachefriends.org/index.html)
* **Git** (Optional, but recommended for cloning)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Database Setup (MySQL with XAMPP)

1.  **Start XAMPP Control Panel:** Launch the XAMPP Control Panel application.
2.  **Start Apache and MySQL:** Click the "Start" buttons next to "Apache" and "MySQL" modules.
3.  **Access phpMyAdmin:** Once MySQL is running, click the "Admin" button next to MySQL in the XAMPP Control Panel. This will open phpMyAdmin in your browser (`http://localhost/phpmyadmin`).
4.  **Create Database:**
    * In phpMyAdmin, click on "New" in the left sidebar.
    * Enter a database name (e.g., `employee_db`).
    * Click "Create".

5.  **Configure Spring Boot for MySQL:**
    * Open the `application.properties` file located in `em-project/src/main/resources/`.
    * Ensure the following lines are present and configured for your MySQL database. If not, add them, replacing placeholder values if needed:

        ```properties
        # MySQL Database Configuration
        spring.datasource.url=jdbc:mysql://localhost:3306/employee_db?useSSL=false&serverTimezone=UTC
        spring.datasource.username=root
        spring.datasource.password= # Leave blank if no password is set for root in XAMPP
        spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

        # JPA Properties (Hibernate)
        spring.jpa.hibernate.ddl-auto=update # Use 'update' to automatically create/update tables
        spring.jpa.show-sql=true
        spring.jpa.properties.hibernate.format_sql=true
        spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect # Or MySQL5InnoDBDialect for older MySQL
        ```
        * **Important:**
            * `employee_db` should match the database name you created in phpMyAdmin.
            * `spring.datasource.username` is typically `root` for XAMPP's default MySQL.
            * `spring.datasource.password` is usually empty for XAMPP's default MySQL root user.
            * `spring.jpa.hibernate.ddl-auto=update` will automatically create the `employee` table based on your `EmployeeEntity.java` when the application starts. For production, consider `validate` or `none` and use migrations.

### Backend Setup

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone [https://github.com/your-username/employee-crud.git](https://github.com/your-username/employee-crud.git)
    cd employee-crud/em-project # Navigate to the backend root if your project structure separates frontend/backend
    ```
    *(Note: Based on your `git status` output, it seems your backend is in `em-project`.)*

2.  **Navigate to the backend project directory:**
    ```bash
    cd D:\Employee_CRUD\em-project
    ```

3.  **Build the Spring Boot application:**
    ```bash
    mvn clean install
    ```
    This command compiles the code, runs tests, and packages the application into a JAR file.

4.  **Run the Spring Boot application:**
    ```bash
    mvn spring-boot:run
    ```
    The backend server will start, typically on port `8080`.

### Frontend Setup

The frontend part of the project is expected to be in a subdirectory, likely named `employee-frontend`.

1.  **Navigate to the frontend project directory:**
    *(Assuming `employee-frontend` is a direct subdirectory of `em-project` or `D:\Employee_CRUD` depending on your exact structure. Adjust the path if needed.)*
    ```bash
    cd D:\Employee_CRUD\em-project\employee-frontend
    # OR if employee-frontend is a sibling to em-project:
    # cd D:\Employee_CRUD\employee-frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
    This will install all the necessary Angular packages defined in `package.json`.

3.  **Start the Angular development server:**
    ```bash
    ng serve
    ```
    The Angular application will compile and start a development server, typically on port `4200`.

4.  **Access the application:**
    Open your web browser and navigate to `http://localhost:4200`. You should see the Employee CRUD application.