# System Requirements
1. PHP version >= 8.2
2. Composer >= 2.8.4 (https://getcomposer.org)
3. MySQL >= 8.0.33
4. Yarn

# Backend Setup
1. `$ cp .env.example .env` # copies the example environment variables.
2. create a MySQL database named `catch_be_dev_test`.
3. `$ composer install`
4. Open `.env` and modify the following database variables if needed.
    * `DB_DATABASE=catch_be_dev_test`
    * `DB_USERNAME=root`
    * `DB_PASSWORD=`
5. `$ php artisan migrate`
6. `$ php artisan app:import-customer-data`
7. `$ php artisan serve`

# Frontend Setup
1. `$ cd ui`
2. `$ yarn`
3. `$ yarn dev`

# URLs
1. `http://localhost:3000/` # frontend url
2. `http://localhost:8000/` # backend url

# Running the App
1. make sure both frontend and backend setup steps as been followed.
2. visit http://localhost:3000
3. it will show the customer table with basic pagination (previous, next)
4. it also shows pagination meta data (Showing 1 to 15 of 1000)
5. table headers can be clicked for sorting, though it lacks arrows, when clicking a header twice, it will sort from descending to ascending and vice versa.