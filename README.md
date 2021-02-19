# itnachota

"itnachota" translates to "so small". This is a url shortener made by `Shashank Kumar`. 

[This project is still a work under progrees.] 

The front-end part of the application is still underdevelopement but if you wish to try the app nevertheless, clone and do the following:

To run this, 

* yarn install
* yarn build
* yarn start 
* go to localhost:5050/api/link/ 

and boom. You are good to go.

Things the user must keep in mind: 

This project uses mongoDB so you need to add a `.env` file and enter MONGODB_URL=url
You can set up your own mongoDB atlas and enter the url in .env or contact the owner of this repository for a demo.
The default port is set at `5050` but can be modified in the `.env` file as `port=3000` (we are using 3000 in this case). 
Make sure that after you clone this, you navitage to the `itna_chota` folder. If you do not, yarn build and other scripts will not work. 
