import qs from "qs";
import _ from "lodash";
import https from 'https'

import { getCinchyAuthData } from "../shared/utils/cinchy";

const tokenFieldName = "cinchyWebToken";
const tokenExpiresFieldName = "cinchyWebTokenExpires";

const getCinchyWebToken = async ($axios, isUserRequest = false) => {

  try {
    console.log('enter into cinchy function....')
    console.log('isUser',isUserRequest)


   // console.log('func',getCinchyAuthData())

    // if (isUserRequest) {
    //   const { access_token } = getCinchyAuthData();
    //   return access_token;
    // }
    // const currentToken = !process.client
    //   ? null
    //   : localStorage.getItem(tokenFieldName);
    // const tokenExpires = !process.client
    //   ? null
    //   : localStorage.getItem(tokenExpiresFieldName);

    // if (currentToken && tokenExpires > Math.floor(Date.now() / 1000)) {
    //   return currentToken;
    // }

    const data = await $axios.$post(
    "https://openwealth.network/CinchySSO/identity/connect/token",
      qs.stringify({
        client_id: "openWealthDev_2",
        client_secret: "A5CC11B7-78E5-42EA-9C65-E3119D532FEA",

        grant_type: "password",
        scope: "js_api",
        username: "openwealth-devExternal1",
        password: "cinchy",
      }),
      // qs.stringify({
      //   "client_id": "oakhill-web",
      //   "client_secret": "F5B8E17B-CAD5-4002-B188-0E0231FF205F",
      //   "grant_type": "password",
      //   "scope": "js_api",
      //   "username": "webapp",
      //   "password": "cinchy"
      // }),
      { withCredentials: true },
      {
        headers: {
         // "content-type": "application/x-www-form-urlencoded;charset=utf-8",
         "Content-Type": "application/x-www-form-urlencoded",
         'Accept': 'application/x-www-form-urlencoded',
         'Access-Control-Allow-Origin': '*',
          withCredentials: true,
         mode: 'no-cors',
        },
      }
    );





          console.log('access_token',data)
          console.log('cookieres',document.cookie)
  //   const { access_token, expires_in } = data;
  //   const nowInSeconds = Math.floor(Date.now() / 1000);
  //   const expires = nowInSeconds + expires_in;
  //   localStorage.setItem(tokenFieldName, access_token);
  //   localStorage.setItem(tokenExpiresFieldName, expires);
  //  return access_token;
  } catch (e) {
    console.warn("Error getting cinchy token", e);

  }
};

export default ($axios) => ({

  fetchCinchyQuery: async (
    queryName,
    params = null,
    prefix = "Procurify",
    postData = false,
    mapParams = false,
    isUserRequest = false // Used to know if request needs authentication token intead of public token
  ) => {
    try {
      console.log('get into try')
      if (mapParams && params) {
        params = mapParamsToCinchyQueryParams(params);
      }
      const currentToken = await getCinchyWebToken($axios, isUserRequest);
     // const currentToken='eyJhbGciOiJSUzI1NiIsImtpZCI6IkE4M0UwQTFEQTY1MzE0NkZENUQxOTFDMzRDNTQ0RDJDODYyMzMzMzlSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6InFENEtIYVpURkdfVjBaSERURlJOTElZak16ayJ9.eyJuYmYiOjE3MTgzNzEyOTgsImV4cCI6MTcxODM3NDg5OCwiaXNzIjoiaHR0cHM6Ly9vcGVud2VhbHRoLm5ldHdvcmsvY2luY2h5c3NvIiwiYXVkIjoiaHR0cHM6Ly9vcGVud2VhbHRoLm5ldHdvcmsvY2luY2h5c3NvL3Jlc291cmNlcyIsImNsaWVudF9pZCI6Im9wZW5XZWFsdGhEZXYiLCJzdWIiOiIxNDkiLCJhdXRoX3RpbWUiOjE3MTgzNzEyOTgsImlkcCI6ImxvY2FsIiwianRpIjoiNDk2NzQ1NjdFM0ZERDY2MDRBNzU0NTI2NzlEMkNEMEUiLCJpYXQiOjE3MTgzNzEyOTgsInNjb3BlIjpbImpzX2FwaSJdLCJhbXIiOlsiY3VzdG9tIl19.F4L50rOLq5__4qVI_8xKGVLIBbmol_7NZ0dJ0-gKGptBi0KgmZqejAR-6GK4q9EPthbN6xsq4Ae2Wpldjk_z3sP_Kwa9e7WJgF0fcmo64uKK6HWWfjPRZPzbjTHe09uOt55mdBw2ReUQp2wl9zut7pQXHzucg9dlZY_6p3wS50t1DeiQe9obi8ajqSVEb1NVRO_0ZKRNVBeHm1UqRoRyC797sWCHtWSJQsAYTyXimJuDNGhal7tGSjRtR9MIrb21TUW_ae-PoBcU3dLVsStGDcXhH6wDkpf4LU3pb11jI8hKHr00WO_n6KKy3nf8BqdTQvYQXecRffRKai7fWlSUGA'
      console.log('current token',currentToken)
      const queryData = await $axios.$get(
        `https://openwealth.network/API/${prefix}/${queryName}`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
          params,
        }
      );

      if (postData) {
        return true;
      } else {
        let schema = queryData.schema;
        let data = queryData.data;
        let items = {};

        const mappedData = data.map((value) => {
          items = {};
          schema.forEach((column, index) => {
            items[_.camelCase(column.columnName)] = value[index];
          });
          return items;
        });
           mappedData['schema']=schema
        return mappedData;
      }
    } catch (e) {
      console.warn("Error getting cinchy token", e);
      // if (e.response?.status === 401) {
      //   throw unauthorizedError;
      // } else {
      //   throw serverError;
      // }
    }
  },

});

const mapParamsToCinchyQueryParams = (params) => {
  let mapped = {};
  Object.keys(params).map((key) => {
    mapped[`@${key}`] = params[key];
  });

  return mapped;
};
