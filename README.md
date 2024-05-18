## Movie Listing Project

This project lists movies and allows users to navigate to the details page by clicking on the movie name in the table. It is built using React.js, SCSS, Redux Thunk, Material UI, and Docker.

### Directory Structure

- **public**
- **src**
    - **components**
    - **pages**
    - **redux** (for state management)
    - **utils**  (common functions)   
- **.env**
- **Dockerfile**

### How to Run the Project?

#### Installation
1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Add a `.env` file to the root directory with the following content:


- `REACT_APP_API_URL` is the endpoint from which movie data is fetched.
- `REACT_APP_API_KEY` is the API key provided by the site to access this endpoint.

#### Usage
To run the project, follow these steps:

1. Build the Docker image:

docker build -t [project-name] .


2. Run the Docker container: 

docker run -p 3000:3000 [project-name]


3. Access the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.
