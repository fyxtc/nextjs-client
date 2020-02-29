const DEBUG = false;
const HEROKU_URL = "https://flask-server2.herokuapp.com/"
const LOCAL_URL = "http://localhost:8080/";

export const SERVER_URL = DEBUG ? LOCAL_URL : HEROKU_URL


