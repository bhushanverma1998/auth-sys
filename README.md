# AUTHENTICATION SYSTEM

A simple Authentication system developed using Node.js, Express.js and Mongodb for storing data in Database. It can be used by any application which uses users login/signup before accessing some important pages.

For using the application you need to clone the project in your system. 
    ## code - git clone https://github.com/bhushanverma1998/authentication-system

The project needs to have all node_modules installed. After cloning the project. First you need to install node_modules inside the project.
    ## npm install

I have securely hidden all my secret keys inside environment variables. For using those variables or accessing inside the project. I have installed dotenv npm. It will be working after installing above code but you need to create a file inside the folder named .env in the root directory and add following details in it.

1. MONGO_URI= // Your mongodb connection URL i.e mongodb://localhost:27017/app_name.
2. GOOGLE_CLIENT_ID= // Create your facebook developer account for facebook authentication.
3. GOOGLE_CLIENT_SECRET= // Create your facebook developer account for facebook authentication.
4. GOOGLE_CALLBACK_URL= // ex-http://localhost:8000/users/auth/google/callback
5. FB_CID= // Create your facebook developer account for fb authentication.
6. FB_CS= // Create your facebook developer account for fb authentication.
7. FB_CALLBACK_URL= // ex-http://localhost:8000/users/auth/facebook/callback
8. SITE_KEY= // Create you google developer account for recaptcha and use V3 version from google recaptcha.
7. SECRET_KEY= // Create you google developer account for recaptcha and use V3 version from google recaptcha.
8. SECRET_SESSION_KEY= // create your own secret key for express session.
9. SERVICE= //gmail
10. HOST= //smtp.gmail.com
11. PORTS= //587
12. GMAIL_UNAME= //use you gmail id
13. GMAIL_PASS= //use can create app password inside security after 2 step verification setup.

![image (assets/images/home.png=400*250)](/assets/images/home.png)

# FEATURES & FUNCTIONALITY

 ## 1. LOGIN/SIGNUP PAGES

    ![image (assets/images/signup.png=400*250)](/assets/images/signup.png)

    <p>Fill the required fields i.e. Full Name,Email,Password,Confirm Password</p>
    <p>First Server will check for Password fields match or not.</p>
    <p>After that check for email if already exists.</p>
    <p>If both checks are valid then user account will be create and user Will see login page</p>

    ![image (assets/images/login.png=400*250)](/assets/images/login.png)

    <p>Enter the details in field i.e. Email and password</p>
    <p>First server checks for email exists in database.</p>
    <p>Second Server checks for the password validation.</p>
    <p>If both ckecks are validated user will be directed to Home page.</p>

 ## 2. SOCIAL AUTHENTICATION

    ![image (assets/images/login.png=400*250)](/assets/images/login.png)

    <p>User can sign in using google or Facebook by clicking on the below buttons in login/signup page</p>
    <p>User needs to enter correct data inside google or Facebook. After successful validation user will be directed to Home Page.</p>

 ## 3. FORGET PASSWORD

    ![image (assets/images/forget_page.png=400*250)](/assets/images/forget_page.png)

    <p>By clicking on the Forget Password link on Login page. You will be redirected to Forget Password page where you have to enter the registered Email. If Email exists you will get the link for reset Password on Email.</p>

    ![image (assets/images/mail_page.png=400*250)](/assets/images/mail_page.png)

    <p>If You have registered email on the website you will get the mail inside Gmail.</p>
    <p>You have to click on the link for redirecting to the Reset Password Page.</p>

    ![image (assets/images/reset_pass_page.png=400*250)](/assets/images/reset_pass_page.png)

    <p>Now You will get Reset Password Page if You have the valid token for Reset Password</p>
    <p>Here Enter the new Password and click on below button.</p>

 ## 4. RESET PASSWORD

    ![image (assets/images/reset_pass_page.png=400*250)](/assets/images/reset_pass_page.png)

    <p>If the user already logged in. He can directly reset password by clicking on reset-password on Home Page.</p>#� �a�u�t�h�e�n�t�i�c�a�t�i�o�n�-�s�y�s�t�e�m�
�
�
