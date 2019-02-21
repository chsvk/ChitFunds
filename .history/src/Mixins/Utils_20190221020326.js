export default{
    methods: {
        getDate: function(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd = '0'+dd
            } 
            if(mm<10) {
                mm = '0'+mm
            } 
            return today = mm + '/' + dd + '/' + yyyy;
        },
        checkAllFields: function(data){
            var result = true
            var index = 0
            Object.values(data).forEach((value)=>{
                index++;
                if(value == ''){
                    result = false
                    console.log(index)
                }
            })
            return result
        }
    }   
}