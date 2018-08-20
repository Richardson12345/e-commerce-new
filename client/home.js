var app = new Vue({
    el: '#app',
    data: {
        title: 'Wellcome to Sugoi Batik',
        admin : false,
        isLogged : false,
        categories : ["All Categories","bags", "innerwear", "outerwear"],
        items: '',
        cart: [],
        amount: 0,
        name: "",
        category: "",
        price: "",
        imageUrl: "",
        currentItem: ''
    },
    methods: {
        checkout () {
            this.cart = []
            swal('THANK YOU FOR SHOPPING', 'please trasnfer the amount to my account hehehe its been a pleasure boi', 'success')
        },
        home(){
            this.$router.push('/')
        },
        isAdmin(){
            if(localStorage.getItem("isAdmin") == "true"){
                this.admin = true
            }
        },
        signout(){
            localStorage.clear()
            location.replace('index.html')
        },
        login(){
            location.replace('index.html')
        },
        checkUser(){
          if(localStorage.getItem('token')){
            this.isLogged = true
          }
        },
        addItem(){
          alert("succesfully added itlamo em")
        },
        filter(category){
          axios.post('http://localhost:3000/items/filterCategories', { category })
          .then((result => {
              this.items = result.data
              swal('sorted', `succesfully sorted items by ${category}`, 'success')
          }))
          .catch((err => {
              console.log(err)
              swal('error', 'something went wrong during the search', 'warning')
          }))
        },
        purchase(item, price){
          let itemObj = {
            item,
            price
          };
          if(this.isLogged){
           this.cart.push(itemObj);
           this.amount ++;
           swal('success', `succesfully added ${itemObj.item} to cart`, 'success')  
          }else{
            alert("please login to purchase item")
          }
        },
        deleteItem(id){
            console.log(id)
          axios.delete(`http://localhost:3000/items/delete/${id}`, { headers: { token: localStorage.getItem('token')}})
          .then((result => {
              this.items = result.data
              swal('success', 'succesfully deleted item','success')
          }))
          .catch((err => {
              swal('ooops', 'something went wrong', 'warning')
          }))
        },
        add(name, price, category, imageUrl){
          let itemObj = {
            name,
            category,
            price,
            imageUrl
          }
          axios.post('http://localhost:3000/items/addItem', itemObj, { headers: { token: localStorage.getItem('token') } })
          .then((result => {
              swal('success', 'succesfully added item', 'success');
              axios.get('http://localhost:3000/items')
              .then((result => {
                  this.items = result.data
                  console.log(this.items)
              }))
              .catch((err => {
                  console.log(err, 'wdadas')
              }))
          }))
          .catch((err => {
              swal('ooops', 'something went wrong', 'warning')
          }))
        },
        get(){
            axios.get('http://localhost:3000/items')
            .then((result => {
                this.items = result.data
                console.log(this.items)
            }))
            .catch((err => {
                console.log(err, 'wdadas')
            }))
        },
        update ( item ) {
            this.currentItem = item
            this.name = item.name
            this.imageUrl = item.imageUrl
            this.price = item.price.split(' ')[1]
        },
        updateItem( name, price, category, imageUrl ) {
            let updateObj = {
                name,
                price,
                category,
                imageUrl
            }
            axios.put(`http://localhost:3000/items/${this.currentItem._id}`, updateObj, { headers: { token: localStorage.getItem("token") } })
            .then((result => {
                this.items = result.data
                swal('success', 'succesfully updated item', 'success')
            }))
            .catch((err => {
                console.log(err)
                swal('Ooops', 'something went wrong updating', 'warning')
            }))
        }
    },
    mounted () {
        if ( localStorage.getItem('admin') == 'true') {
            this.admin = true
        }
        axios.get('http://localhost:3000/items')
        .then((result => {
            this.items = result.data
            console.log(this.items)
        }))
        .catch((err => {
            console.log(err, 'wdadas')
        }))

        if ( localStorage.getItem('token')) {
            this.isLogged = true;
        }
    }
})
   