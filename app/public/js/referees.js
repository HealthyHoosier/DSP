const Referee = {
    data() {
      return {
        "referees": [],
      }
    },
  

    methods: {

      prettyDollar(n) {
        const d = new Intl.NumberFormat("en-US").format(n);
        return "$ " + d;
    },

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