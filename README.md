# Web Project API Full

Web Project API Full is a social platform backend designed for users to share photos of their trips, interact with others, and create their own accounts. The API provides secure user authentication, photo uploads, and a like system, ensuring a smooth and engaging experience for travelers and photography enthusiasts.

## 🚀 Key Features

-   **User Accounts** – Sign up, log in, and manage personal profiles.
-   **Photo Sharing** – Upload and showcase travel photos.
-   **Like System** – Users can like and interact with shared photos.
-   **Secure Authentication** – Ensures safe access with protected user data.
-   **Smooth Performance** – Fast and efficient API responses for a seamless experience.

## 🛠️ Technologies Used

-   **Node.js + Express.js** → Server-side development and REST API creation.
-   **MongoDB + Mongoose** → Database for storing user data, photos, and interactions.
-   **JWT (JSON Web Tokens)** → Secure authentication and authorization.
-   **Multer** -> Middleware for handling multipart/form-data, which is primarily used for uploading files.
-   **Bcrypt** -> Library for hashing passwords.
-   **dotenv** -> Library to load environment variables from a .env file.

## Conclusion

The Web Project API Full successfully delivers a functional and robust backend for a social photo-sharing platform. By utilizing Node.js and Express.js, the API provides a scalable and efficient solution for managing user accounts, photo uploads, and interactions. The integration of MongoDB ensures reliable data storage, while JWT authentication secures user access and protects sensitive information. The use of Multer simplifies file uploads, and Bcrypt enhances password security. This project demonstrates a strong understanding of backend development principles and the ability to build a complete and secure API for social applications. It represents a valuable example of how to combine modern technologies to create a dynamic and engaging user experience.

## 📂 Installation and Usage

1.  Clone the repository:

    ```bash
    git clone [https://github.com/caleb963/web_project_api_full.git](https://github.com/caleb963/web_project_api_full.git)
    ```

2.  Navigate to the project directory:

    ```bash
    cd web_project_api_full
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Create a `.env` file in the root directory with the following variables:

    ```
    PORT=3001
    MONGODB_URI=<Your MongoDB Connection String>
    JWT_SECRET=<Your Secret Key>
    ```

5.  Start the server:

    ```bash
    npm run dev
    ```

    
