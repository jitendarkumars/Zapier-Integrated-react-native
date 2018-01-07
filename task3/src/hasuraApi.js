const clusterName = "epistolary36"

const dataUrl = "https://data." + clusterName + ".hasura-app.io/v1/query";
const loginUrl = "https://auth." + clusterName + ".hasura-app.io/v1/login";
const signupUrl = "https://auth." + clusterName + ".hasura-app.io/v1/signup";
var url = "https://hooks.zapier.com/hooks/catch/2846422/85clc3/";
import { Alert } from 'react-native';

const networkErrorObj = {
  status: 503
}

export async function insertDetail(email,message,table){
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
   
  "type": "insert",
  "args": {
      "table": table,
      "objects": [
        {
          "email": email,
          "message": message,
        }
      ]
  }          
          
};


var requestOptions1 = {
  "method": "POST",
  "headers": {
      "Content-Type": "application/json"
  }
};


var body1 = {          "email": email,
          "message": message,
          "table": table,   
};

requestOptions["body"] = JSON.stringify(body);
requestOptions1["body"] = JSON.stringify(body1);
try{
  let resp = await fetch(dataUrl, requestOptions);
  let resp1 = await fetch(url,requestOptions1);
  return resp;
}
catch (e) {
  console.log("Request failed: " + e);
  return networkErrorObj;
}
};