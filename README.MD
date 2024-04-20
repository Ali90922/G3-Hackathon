# Project Documentation

## Vision Statement

Our project's primary objective is to create a secure and efficient user authentication system. We aim to facilitate user registration and authentication using Firebase, ensuring data integrity and security throughout the process. Once authenticated, user activities such as login, logout, and session durations are meticulously logged. These activities include sign-in and sign-out times, total website access duration, user IP addresses visualized on a map, and the calculation of average session times across all users. Our backend, built with Express.js, plays a crucial role in verifying and managing this information securely.

## Key Features

- **Secure Authentication**: Utilize Firebase for robust user authentication.
- **Activity Tracking**: Monitor sign-in/out times and total access duration.
- **IP Address Mapping**: Visualize user locations for enhanced analytics.
- **Session Analysis**: Calculate and track average session durations.

## Getting Started

To explore and run our project, follow these steps:

### Initial Setup

1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/devhacks-2024/Halal-Guys-Repository.git

   ```
2. Navigate to the RepositoryChange directory to the cloned repository:

<pre><div class="dark bg-gray-950 rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><br class="Apple-interchange-newline"/></div></div></pre>

cd Halal-Guys-Repository

**Prepare Your Branch**

Check existing branches and switch to the appropriate development branch:

<pre><div class="dark bg-gray-950 rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><br class="Apple-interchange-newline"/></div></div></pre>

git branch
git checkout ready-for-submission-g3
git pull

### Running the Project

#### Starting the Client

To start the client application:

1. Navigate to the user authentication client directory:
   cd userauth

Start the client application:

npm start


This command launches the user login/logout page in your default web browser.

Launching the Backend Server
To initiate the backend server for a secure connection:

From the root directory of the project, run:
yarn run dev
Usage
Creating an Account: Navigate to the user login page to register a new account using a username and password.
Logging In: Use your newly created credentials to log into the system.
Admin Dashboard: Once logged in, all user information, including activity logs, can be viewed from the admin dashboard.
Conclusion
This setup ensures a secure and efficient user authentication system, allowing for detailed tracking and analysis of user activities. By following the steps outlined above, you can explore the features and capabilities of our authentication solution on your local machine.

