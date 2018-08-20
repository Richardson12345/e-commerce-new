var app = new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',
        email: ''
    },
    methods: {
        signup ( username, password, email ) {
            let userObj = {
                username,
                email,
                password
            }
            axios.post('http://localhost:3000/users', userObj)
            .then((result => {
                console.log(result.data)
                swal('succesfully registered', 'will be redirected to the login page shortly where you can login to your account', 'success')
                setTimeout(()=>{
                    location.replace('index.html')
                }, 1000)
            }))
            .catch((err => {
                console.log(err)
                swal('error', 'oops either the username/email you chosen has been used or one of the fields is empty', 'warning')
            }))
        },
        login () {
            location.replace('index.html')
        }
    }
})