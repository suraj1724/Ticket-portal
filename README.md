# Ticket Portal Project

## Setup


        git clone "https://github.com/suraj1724/Ticket-portal.git"
        cd Ticket-portal
        npm install

## Install and Run the Server 

        # Install json-server globally
        npm install -g json-server

        # Install json-server locally as a dev dependency
        npm install json-server --save-dev

        # Start json-server to serve the database
        json-server --watch server/db.json --port 8000

        #api Enpoints
        http://localhost:8000/users
        http://localhost:8000/tickets


        # Now server is started to start the Project Open a new tab in terminal/command Prompt/ bash




## Start the Project

        npm start


## Project Description:
        This Ticket Portal Project provides a platform for managing tickets with different user roles - end user, tech support, and admin. Here are some key features:

        1. User Authentication: Upon starting the project, users will be redirected to the login page. If they    don't have an account, they can create one as an end user, tech support, or admin.

        2. Ticket Management: Once logged in, users can view all their tickets displayed in cards. They can create new tickets, delete existing ones, and update ticket details.

        3. Role-based Access Control: End users and tech support personnel are restricted from updating the status of the ticket. They won't see the status field in the update form. However, admins have full access and can update the status of the tickets.


## Technologies Used:
        1. React: Frontend library for building user interfaces.
        2. Redux Toolkit: State management library for managing application state.
        3. Tailwind CSS: Utility-first CSS framework for designing responsive web interfaces.
        4. Axios: Promise-based HTTP requests.
        5. JSON Server: Provides a quick way to set up a RESTful API server with dummy data.