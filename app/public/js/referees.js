const Referee = {
    data() {
      return {
        "referees": [],
      }
    },
  

    methods: {


        fetchBooksData() {
            fetch('/api/referees/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
    },
    created() {
        this.fetchRefereesData();
    }
  
  }
Vue.createApp(Referee).mount('#refereeTable');