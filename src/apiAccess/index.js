import { API } from '../config/api_details';
import { Alert } from 'react-native';

const fetch = require('node-fetch');

class ApiAccess {



    /*
     * Calling for GET method without Headers
     */
    static get(api_path, token) {
        return this.callingGetApi(api_path, token);
    }

    // Calling for POST method
    static post(api_path, params, token) {
        return this.callingApi(api_path, params, token);
    }

    // Calling for PUT method
    static put(route, params) {
        return {}
    }

    // Calling for DELETE method
    static delete(route, params) {
        return
    }

    static callingApi(api_path, params, token) {
        const url = `${API.domain_name + api_path}`;
        let options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'sentFrom': 'mobile',
                'authenticationKey': '3b8e179db256e4db18d748868d087d4c6bc873bb532b07e44daac5de0a79acfa',
                "cache-control": "no-cache",
                "Authorization": `Bearer ${token}`

            },
            body: params,
        }

        return fetch(url, options).then(resp => {
            ;
            let list = resp._bodyText
            let json = resp.json();
            if (resp.ok) {
                ;
                return json
            }
            return json.then(err => {
                ;
                console.log("error JSON ==>", err)
                Alert.alert("", JSON.stringify(err))
                throw err
            });
        });

    }

    static callingGetApi(api_path, token) {
        const url = `${API.domain_name + api_path}`;
        

        let options = Object.assign({ method: 'GET' }, null);

        let headersObj = {
            "sentFrom" : "mobile",
            "authenticationKey" : "3b8e179db256e4db18d748868d087d4c6bc873bb532b07e44daac5de0a79acfa",
            "Content-Type": "application/json",            
            "Authorization": `Bearer ${token}`

        }
        options.headers = headersObj

        return fetch(url, options).then(resp => {
            ;
            let json = resp.json();
            // alert(JSON.stringify(json));

            if (resp.ok) {
                ;
                return json
            } else {
            
                alert(resp.status)
            }
            return json.then(err => {
                // alert(err.error.message)
                ;
                // Alert.alert("", JSON.stringify(err))
                console.log("error JSON ==>", err.Message)
                if(resp.status == 401){
                    alert(err.Message + ". Kindly Relogin")
                }else{
                    throw new Error(err.error.message);
                }

                
            });
        }).catch((error) => {
            // alert(error)
        })

    }
}

export default ApiAccess;