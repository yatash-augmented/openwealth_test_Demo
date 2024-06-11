import cinchyService from '~/services/cinchy-service'

export default ({ $axios }, inject) => {

  const allMethods = {
    ...cinchyService($axios),
  }
  const methods = Object.keys(allMethods)
  methods.forEach((method) => {
    inject(method, allMethods[method])
  })
}
