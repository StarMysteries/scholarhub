<font color="#0e88f1"><h1 align="center">Commit Changes</h1></font>

**Commit 12.5 Changes**
1. Added dynamic Courses Dropdown(need to "npm install react-select)
2. Added change status for scholarship(providers)
3. Made create scholarships functional(providers)

<br/>


**Commit 12 Changes**
1. Searchbar in HomeStudent fixed
2. Made Reset Filter in sidebar functional.
3. Cleaned AppliedScholarship page.
4. Added ApplicationDetailsModal.
5. Made ProviderProfileModal functional.
6. Updated Providers and Students Table seeders.
7. Updated ProviderController.

<br/>

**Commit 11 Changes**
1. Fixed SignUp - Provider && Student.
2. Fixed Navbar toggle Sidebar.
3. Updated UserAuthController to reject Pending and Declined accounts.
4. Updated useLogin to display rejection of Pending and Declined accounts.
5. Updated Provider model.
6. Renamed SignUpStudentController to StudentController.
7. Merged SignUpProviderController to ProviderController.

<br/>

**Commit 10 Changes**
1. Fixed Sidebar.
2. Updated HomeStudentLayout.
3. Separated HomeStudent javacript from HomeStudent.
4. Updated Courses Table Seeder.
5. Fixed Signup Student (Removed Profile Picture, Added dynamic Courses).
6. Updated Provider's Database.
7. Updated dynamic sidebar button(Appear only in HomeStudent).

<br/>

**Commit 9 Changes**
1. Updated NavbarDonor username to function better dynamically(not using localStorage).
2. Updated useNavbarFunctions hook to fetch providerData(frontend side).
3. Made ProviderProfileModal display dynamic data based from fetched providerData.
4. Improved useCheckLogin hook.
5. Added useCheckLogin hook to HomeStudent to prevent other roles from accessing the page.
6. Updated Provider.php to handle relationship with Users.
7. Added ProviderController to handle provider data fetching(backend side).
8. add filter for active/inactive(HomeDonor)
9. added dropdown instead of another page(Applicant_status)
10. addedbackbutton for(Applicant_Status)
11. cleaned pagination for Homepage
12. added pagination(HomeDonor)
13. added pagination(Applicant_status)
14. Re-added useAuth hooks for HomeDonor, Admin Page, Applied Scholarships page, View More Page.
15. Added useCheckLogin in HomeStudent.
16. Added a Return button for Unauthorized Page.

<br/>

**Commit 8 Changes**
1. Made applicant count in HomeDonor functional
2. Added go back button in Unauthorized page
3. Added Applied Scholarships navigation in Navbar
4. Updated Seeders with more scholarships data to display
5. Filter for scholarships broke
6. Made HomeDonor scholarships dynamic + applicant count
7. Made ApplicantStatus dynamic

<br/>

**Commit 7 Changes**
1. Made ApplicantStatus functional
2. Added ProviderProfileModal
3. Added StudentProfileModal
4. Added seeders
5. Made Signup functional
6. Added AppliedScholarshipPage
7. Added back button functionality to ApplicantStatus page
8. Kyn pulled Lucy Heartfilia

<br/>

**Commit 6 Changes**
1. Modified multiple pages
2. Edited scholarship application table rejection_details field.
3. Fixed pagination for HomeStudent
4. Pulled artificial legendary Iron-Moth

<br/>

**Commit 5 Changes**
1. Updated Homestudentlayout.jsx(Cards simplified)
2. Updated sidebar and navbar
3. Added MoreInfo.jsx
4. Added forget password.jsx
5. Updated login and accepted,viewmore,declined in provider to use<Link/>Pagination
6. Added admin page 
7. Added scholarship form page

<br/>

**Commit 4 Changes**
1. Updated HomeDonor page to dynamically display scholarships based on provider.
2. Modified create_applications_table column Status to add "Pending".
3. Updated ScholarshipsTableSeeder.
4. Separated Login javascript functionalities from the jsx file; creating the following hooks: useCheckLogin, useLogin.
5. Separated HomeDonor javascript functionalities from the jsx file; creating the followng hooks: useDonorScholarships, useFilterScholarships.
6. Added DonorScholarshipController to fetch scholarships based on provider.
7. Separated Sidebar javascript functionalities from the jsx file; creating the following hooks: useSidebarHandler.
8. Updated ScholarshipController to only fetch scholarships that are "Active".
9. Updated Login and Logout functionalities; taking advantage of Laravel's Auth system. Therefore, updating Login, useLogin, useCheckLogin, UserAuthController.

<br/>

**Commit 3 Changes**
1. Added scholarships filter functionality (filter based on courses)
2. Incorporated lazy loading for not used pages
3. Added a loading animation for lazy loading pages
4. Added a ScholarshipController
5. Added more hooks (filterScholarships, sidebarHandler, useFetchScholarships)
6. Modified some migrations (scholarship_requirements, students, providers)
7. Added a create_application_requirements_table migration
8. Added seeders (ScholarshipCoursesTableSeeder, ScholarshipsTableSeeder)
9. Modified some seeders (Courses, Providers, Students)
10. Added comments in web.php

<br/>

**Commit 2 Changes**
1. Added search functionality for courses in *Sidebar*
2. Added "Welcome, _username" in both *Navbar* and *NavbarDonor*
3. Made login and logout in *Navbar* to conditionally appear if user is logged in or not
4. Separated *Login, Navbar, NavbarDonor,* and *Sidebar*: javascript functionality from each other
5. Made Scholarships display for *HomeStudent* functional

<br/>

**Commit 1 Changes**
1. Everything

<br/><br/><br/><br/><br/>


<font color="#0e88f1"><h1 align="center">ScholarHub Local Hosting Configuration Guide</h1></font>

1. Download Composer
2. Download PHP
3. Download XAMPP that has mySQL and Apache
4. Download Node.js
5. Open XAMPP
6. Start Apache and mySQL
7. Open the project in VS Code
8. Open VS Code terminal
9. Run the php installations
```
composer install
```
10. Rename .env.example into .env.
11. Open .env and change the following lines:
```
DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=
```
into
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=scholarhub_db
DB_USERNAME=root
DB_PASSWORD=
```
12. Create the key by using the following command:
```
php artisan key:generate
```
13. Execute the migrations using the following command:
```
php artisan migrate
```
or
```
php artisan migrate:fresh       //to recreate the tables
```
or
```
php artisan migrate:fresh --seed       //to recreate the tables + seed
```
14. Execute the seeders using the following command:
```
php artisan db:seed
```
15. Run the npm installations using the following commands:
```
npm install
```
16. Run the php server using the following command:
```
php artisan serve
```
17. Create a new terminal in VS Code
18. Run the Node.js server for React using the following command:

*Note: Run ``npm run buid`` if necessary.*
```
npm run dev
```


<br/><br/><br/><br/><br/>



<font color="#d22d44"><h1 align="center">Installation and Configuration Guide</h1></font>

**Github Linking**
```
git init
git add .
git commit -m "commit message here"
git branch -M main
git remote add origin https://github.com/StarMysteries/sample.git     //sample.git is replaced with repository url 
git push -u origin main
```

<br/><br/>

**Update Code Repository with new Commit Stage**

*Note: This is recommended if you are not sure how to update the code in the repository*
```
git add .
git commit -m "commit message here"
git push
// or if in another branch:
// git push origin branch_name_here
```

<br/><br/>

**Update latest Commit Stage in the Code Repository**

*Note: DO NOT USE THIS IF YOU ARE NOT SURE WHETHER YOU WANT TO REPLACE EXISTING CODE OR NOT, UPDATE CODE REPOSITORY ***WITH NEW STAGE*** IF THIS IS THE CASE.*
```
git add .
git commit --amend --no-edit
// or..
// git commit --amend -m "new commit message"
// ..to update commit message
git push --force
// or if in another branch:
// git push origin branch_name_here --force
```

<br/><br/>

**Laravel/React/Tailwind Setup**

1. Download Composer
2. Download PHP
3. Download Node.js
4. Open cmd
5. cd to directory where to setup the project
6. Execute the following command to create a Laravel Project:
```
composer create-project laravel/laravel project_name
```
7. Open the project using VS Code
8. Open VS Code terminal
9. Execute the following commands to install React:
```
npm install
npm install react
npm install react react-dom
npm install react-router-dom
npm install axios
```
10. Adjust this section in the .env file:
```
DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=db_name
# DB_USERNAME=root
# DB_PASSWORD=
```
into:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=scholarhub_db
DB_USERNAME=root
DB_PASSWORD=
```


<br/><br/><br/><br/><br/>


<font color="#d22d44"><h1 align="center">Test Cases Credentials</h1></font>

**Student Account:**
```
Email: student@gmail.com
Pass: testing123@
```

**Provider Account:**
```
Email: provider@gmail.com
Pass: testing123@
```

**Admin Account:**
```
Email: admin@gmail.com
Pass: testing123@
```
