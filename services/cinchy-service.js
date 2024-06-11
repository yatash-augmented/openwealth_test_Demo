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
    $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

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
    "cinchy/CinchySSO/identity/connect/token",
      qs.stringify({
        client_id: "openWealthDev_2",
        client_secret: "A5CC11B7-78E5-42EA-9C65-E3119D532FEA",

        grant_type: "password",
        scope: "js_api",
        username: "openwealth-devExternal1",
        password: "cinchy",
      }),
      // qs.stringify({
      //   "client_id": "openWealthDev",
      //   "client_secret": "E9A088AB-B0B2-431E-9B45-ED048424B88B",
      //   "grant_type": "password",
      //   "scope": "js_api",
      //   "username": "openwealth-devExternal1",
      //   "password": "cinchy"
      // }),
      { withCredentials: true },
      {
        headers: {
         // "content-type": "application/x-www-form-urlencoded;charset=utf-8",
         "Content-Type": "application/x-www-form-urlencoded",
         'Accept': 'application/x-www-form-urlencoded'
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
      console.log('current token',currentToken)
      const queryData = await $axios.$get(
        `API/${prefix}/${queryName}`,
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
