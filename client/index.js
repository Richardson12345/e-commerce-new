var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      image: '',
      username: "",
      password: ""
    },
    methods: {
        login(username, password){
            let credentials = {
                username,
                password
            }
            axios.post('http://localhost:3000/users/signIn', credentials)
            .then((result => {
                console.log(result.data)
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('admin', result.data.admin)
                swal('succes', 'you will now be redirected to the homepage short', 'success')
                setTimeout(()=> {
                    location.replace('home.html')
                }, 2000)
            }))
            .catch((err => {
                console.log(err)
                swal('oops', 'the credentials you entered is incorrect', 'warning')
            }))
        },
        register () {
            location.replace('register.html')
        }
    }
})
   