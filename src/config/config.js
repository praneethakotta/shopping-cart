export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb, session) {
      // const fiveMinSession = session + 5;
      // const duration = fiveMinSession - new Date().getTime()
      // console.log(session+'    '+fiveMinSession)
      // if(duration <= 5) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
      // }
    },
    signout(cb, session) {
      this.isAuthenticated = false
      setTimeout(cb, 100) // fake async
    }
}