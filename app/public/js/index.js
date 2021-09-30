
const Offer = {
    data() {
      return {
        "person": {
            name: {},
            picture: {},
            dob: {},
        },
        }
    },
    
    computed: {
        prettyBirthday(){
            return dayjs(this.person.dob.date)
            .format ('D MMM YYYY')
        }
    },
    
    methods:{
        fetchUserData(){
            console.log("A");
            fetch('https://randomuser.me/api/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                console.log("C");
                this.person = responseJson.results[0];
            })
            .catch( (err) => {
                console.error(err);
            })
            console.log("B");
         //end fetchUserData 
        }
    },
    
    created() {
        this.fetchUserData();
    } //end created (Event hook created automatically when the view is created)
}
  
Vue.createApp(Offer).mount('#offerApp');
console.log("Z");