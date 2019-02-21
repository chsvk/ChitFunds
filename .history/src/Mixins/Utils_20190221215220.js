import Vue from 'vue'
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
                ++index;
                if(value == ''){
                    result = false
                    console.log(Object.keys(data)[index])
                }
            })
            return result
        },
        showIncompleteAlert: function(message){
            Vue.swal.fire({
                title: 'Error!',
                text: message,
                type: 'error',
                confirmButtonText: 'Okay'
                })
        },
        showCustomSuccessAlert: function(message){
            Vue.swal.fire({
                title: 'Error!',
                text: message,
                type: 'success',
                confirmButtonText: 'Okay'
                })
        },
        showFullSuccessAlert: function(){
            Vue.swal.fire({
                title: 'Success!',
                text: 'Completed!',
                type: 'success',
                confirmButtonText: 'Okay'
                })
        },
        showSuccessAlert: function(){
            const Toast = Vue.swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              
              Toast.fire({
                type: 'success',
                title: 'Updated Succesfully'
              })
        }
    }   
}