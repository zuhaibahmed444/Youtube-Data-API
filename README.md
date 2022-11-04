# Youtube-Data-API

### Steps to run the project 
- Step 1 : 
    Login to https://console.developers.google.com/
    - create project
    - create service account credentails download the JSON file 
    - Place the JSON file in the project folder 
    - do the credentials path changes in mail.service.js and youtube.service.js 
- Step 2 :
    - run npm i , to download the dependencies
- Step 3 :
    - run node index.js
- Step 4 :
    - In postman , body select formdata -> file , attach the csv file containing youtube link 
    - hit the end point http://localhost:5000/yotubedata
- Step 5 :
    - For mail service to work open your goggle account -> security -> App Password -> create a new app passowrd 
    - 16 digit password is generated , store password in the json file downloaded in Step1  as paramter password:"your 16 digit password"
