function getCinchySesionData(callback) {
  return new CinchyJS({
   // The url of your Cinchy instance
   cinchyRootUrl: "https://openwealth.network",
   // The identity server of your Cinchy instance
  authority: "https://openwealth.network/cinchysso",
   // The client id for your applet
   client_id: "openWealthDev",
   // The callback function that gets executed after login
   silent_refresh_enabled: true,
   // (Optional) (Mandatory if silentRefreshEnabled = true) The silent refresh url
   silent_redirect_uri: "http://localhost:3000/silent-refresh",
   user_loaded_callback: callback,
  });
  // return new CinchyJS({
  //   // The url of your Cinchy instance
  //   cinchyRootUrl: "http://openwealthfi.com/AssetManagement",
  //   // The identity server of your Cinchy instance
  //   authority: "http://openwealthfi.com/AssetManagement/cinchysso",
  //   // The client id for your applet
  //   client_id: "advisor-portal",
  //   // The callback function that gets executed after login
  //   silent_refresh_enabled: true,
  //   // (Optional) (Mandatory if silentRefreshEnabled = true) The silent refresh url
  //   silent_redirect_uri: "http://localhost:3000/silent-refresh",
  //   user_loaded_callback: callback,
  // });
}


