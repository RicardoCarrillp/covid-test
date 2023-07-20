# SmartSoftPrueba
## COVID-19 Dashboard

This is an Angular project that includes a basic login section with a username and password to access the dashboard. The dashboard section allows the user to upload a CSV file containing COVID-19 deaths data for each state in the US and presents relevant information and visualizations.

### Getting Started

To run this project locally, follow the steps below:

### 1. Clone the repository:
`git clone https://github.com/RicardoCarrillp/smartSoft_Prueba)https://github.com/RicardoCarrillp/smartSoft_Prueba`

`cd covid19-dashboard`

### 2. Install dependencies:
`npm install` 

### 3. Run the Angular development server:
`ng serve`

#### Open your browser and go to http://localhost:4200 to access the application.

## Login
To access the dashboard, users need to log in using their username and password.

## Dashboard Section

### CSV Data Upload
Upon accessing the dashboard, users will find a button to upload a CSV file containing COVID-19 deaths data for each state in the US. The data will be extracted from the uploaded file and displayed on the dashboard. This step is performed only once, preferably during the initial project run.

### Data Analysis
After reading the uploaded CSV file, the following questions will be answered and displayed on the dashboard:

a. State with the highest total deaths to date.

b. State with the lowest total deaths to date.

c. Most affected state (with an explanation).

d. Circular chart representation of the percentage of total deaths vs. the total population for each state. (Implementing a library for this visualization)

### Libraries Used
The project utilizes the following libraries:

- **Chart.js**: A charting library to create visualizations, including the circular chart for percentage representation.
- **Paparse**: A CSV parsing library used to extract data from the uploaded CSV file.
- **Rxjs**: A library for reactive programming used in Angular applications.



## Contributors

- Ricardo Carrillo(https://github.com/ricardocarrillp)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
