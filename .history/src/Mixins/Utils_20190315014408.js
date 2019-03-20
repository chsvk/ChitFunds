import Vue from 'vue'
export default{
    methods: {
        getDate: function(){
            return String(new Date().toDateString().toLocaleDateString("en-US")).split('/').join('-')
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