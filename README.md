<font color="#0e88f1"><h1 align="center">Commit Changes</h1></font>

**Commit 2 Changes**
1. Added search functionality for courses in *Sidebar*
2. Added "Welcome, _username" in both *Navbar* and *NavbarDonor*
3. Made login and logout in *Navbar* to conditionally appear if user is logged in or not
4. Separated *Login, Navbar, NavbarDonor,* and *Sidebar*: javascript functionality from each other

<br/><br/>

**Commit 1 Changes**
1. Everything

<br/><br/><br/><br/><br/>


<font color="#0e88f1"><h1 align="center">ScholarHub Local Hosting Configuration Guide</h1></font>


1. Download PHP
2. Download XAMPP that has mySQL and Apache
3. Download Node.js
4. Open XAMPP
5. Start Apache and mySQL
5. Open the project in VS Code
6. Open VS Code terminal
7. Execute the migrations using the following command:
```
php artisan migrate:fresh
```
8. Execute the seeders using the following command:
```
php artisan db:seed
```
9. Run the php server using the following command:
```
php artisan serve
```
10. Create a new terminal in VS Code
11. Run the Node.js server for React using the following command:
```
npm run dev
```

*Note: Run ``npm run buid`` if necessary.*


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