# Student Application System

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/student-application-system)
![GitHub language count](https://img.shields.io/github/languages/count/yourusername/student-application-system)
![GitHub top language](https://img.shields.io/github/languages/top/yourusername/student-application-system)

## Overview

The **Student Application System** is a full-stack application designed to facilitate the management of student applications. It incorporates role-based access, allowing users to create, update, and manage their applications, while admins can accept or reject them.

## Features

- **User Role**: Create, send, and update applications (CRUD operations).
- **Admin Role**: Accept or reject applications.
- **Email Verification**: Users must verify their email addresses to access certain features.
- **Role-Based Access**: Different functionality based on user roles.

## Roles

- **User**: Can perform CRUD operations on their applications.
- **Admin**: Can accept or reject applications. To assign the admin role, manually change the role to `'admin'` in MongoDB.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [MongoDB](https://www.mongodb.com/) (for the database)
- Live Sass Compiler (VSCODE Extension)

### Steps

1. **Clone the repository**:

   ```bash
   git clonehttps://github.com/muhammad-umair42/student-application-system.git
   cd student-application-system
   ```

2. **Installing dependencies**:
   Run Commands:

```bash
cd student-application-system-frontend
npm install
cd ../student-application-system-backend
npm install
```

3. **VS CODE Extensions**:
   For SCSS support, install the Live Sass Compiler extension in Visual Studio Code.

4. **Envoirment Variables**:
   Create a .env file in the student-application-system-backend directory with the following variables:

```bash
AZURE_CLIENT_ID=your_azure_client_id_for_multiple_tenants_and_personal_accounts
AZURE_CLIENT_SECRET_ID=your_secret_id
AZURE_CLIENT_SECRET=your_client_secret
AZURE_TENANT_ID=your_azure_tenant_id
AZURE_REDIRECT_URI=http://localhost:PORT/auth/azure/callback
PORT=your_server_port
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USERNAME=your_email_for_nodemailer
EMAIL_PASSWORD=your_app_secret_password_for_sending_emails
MICROSOT_GRAPH_URL=https://graph.microsoft.com/v1.0/me?$select=id,displayName,mail,userPrincipalName
AZURE_AUTHORITY=https://login.microsoftonline.com/common/7fa84815-8fcd-41fa-8542-5f8cb10487a7//public ms 
```

5. **Running the Application**:
   Start The Backend:

```bash
npm run start
```

Start the FrontEnd:

```bash
npm run dev
```

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **SCSS**: A CSS preprocessor that allows for more flexible and powerful styling.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine for server-side development.
- **Express**: A fast web framework for Node.js to build web applications and APIs.
- **MongoDB**: A NoSQL database for storing application data.

### Authentication

- **Microsoft Azure OAuth**: An authentication protocol that allows users to log in with their Microsoft accounts.

### Email Handling

- **Nodemailer**: A module for Node.js to send emails easily.
