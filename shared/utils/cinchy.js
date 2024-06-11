// The key that cinchySDK uses to store auth data
export const cinchyStorageKey =
   "oidc.user:https://openwealth.network/cinchysso:openWealthDev_2"
//  "oidc.user:http://openwealthfi.com/AssetManagement/cinchysso:advisor-portal";
export const getCinchyAuthData = () => {
  return process.client && sessionStorage.getItem(cinchyStorageKey)
    ? JSON.parse(sessionStorage.getItem(cinchyStorageKey))
    : {};
};
export const removeCinchyAuthData = () => {
  sessionStorage.clear();
};
