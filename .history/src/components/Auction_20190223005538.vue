<template>
    <div class="groups">
         <transition style="" v-if="updateAuction" class="auctionUpdate" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
                <h2>Update Auction  <toggle-button @change="onChangeEventHandler" :value="calculateNetInstallement"
               color="#82C7EB"
               :sync="true"
               :labels="true"/></h2> 
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <h4>Name: {{temporary.name}}</h4>
                <h4>Month: {{Month}}</h4>
                <h4>Started: {{temporary.started}}</h4>
                <h4>Value: {{temporary.value}}</h4>
                <h4>Gross Installement: {{temporary.value/temporary.months}}</h4>
                <h4 v-if="!calculateNetInstallement">Net Installement: {{temporary.value/temporary.months}}</h4>
                <h4 v-else>Net Installement : {{(temporary.value/temporary.months)-((auctionAmount-((commissionPercentage/100)*temporary.value))/temporary.months)}}</h4>
                <div style="display:flex" class="comission">
                        <input class="comision" placeholder="Commission Percentage" type="text" v-model="commissionPercentage">
                        <p>{{(commissionPercentage/100)*temporary.value}}</p>
                </div>
                <input type="text" placeholder="Auction Amount" v-model="auctionAmount">
                <div  class="content">
                        <input type="text" placeholder="Member ID" v-model="mid">
                        <p>{{memberName}}</p>
                        <button style="width:40%" @click="check()">Check</button>
                </div>
                <div style="display: flex; margin: 0.4em;" class="flexclass">
                <button style="margin: 0.4em" @click="add()">Update</button>
                <button style="margin: 0.4em" @click="cancelUpdate()">Cancel</button>
                </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
        <h1 class="heading">Auction Book <button @click="viewPrev()" style="width: 10%">View Previous</button></h1>
        <table>
            <tr>
                <th>Month</th>
                <th>Group Name</th>
                <th>Total Value</th>
                <th>Gross Installment</th>
                <th>Net Installment</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(g,i) in groups" :key="i">
                <td><p>{{Month}} ({{g.months}} Months)</p></td>
                <td><p>{{g.name}}</p></td>
                <td><p>{{g.value}}</p></td>
                <td><p>{{g.value/g.months}}</p></td>
                <td v-if="g.monthNumber==0">{{g.value/g.months}}</td>
                <td v-else><p>{{(g.value/g.months)-((g.auctionAmount-((g.commissionPercentage/100)*g.value))/g.months)}}</p></td>
                <td><button @click="update(i)">Update</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import {db} from '../main'
import router from '../router'
export default {
    router,
    data(){
        return{
            Month: '',
            GorupName: '',
            TotalValue: '',
            Gross: '',
            Net: '',
            comission: '',
            auctionAmount: '',
            mid: '',
            groups: [],
            memberName: '',
            monthNames: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
                ],
            commissionPercentage: [],
            calculateNetInstallement: true,
            updateAuction: false,
            temporary: {
                
            }
        }
    },
    methods: {
        cancelUpdate: function(){
            this.calculateNetInstallement = ""
            this.mid = ""
            this.auctionAmount=""
            this.commissionPercentage = ""
            this.updateAuction = !this.updateAuction;
        },
        calValue: function(value, dummy){
            if(this.calculateNetInstallement){
                return value
            }else{
                return dummy
            }
        },
        onChangeEventHandler: function(){
            this.calculateNetInstallement = !this.calculateNetInstallement;
        },
        viewPrev: function(){
            router.push({
                name: 'viewPrev'
            })
        },
        getMonth: function(){
            var today = new Date();
            var mm = today.getMonth();
            return this.monthNames[mm];
        },
        check: function(){
            db.collection("Groups").doc(this.temporary.name).collection("Members").doc(this.mid).get().then((doc)=>{
                if(doc.exists){
                    this.memberName = doc.data().name;
                }else{
                    this.memberName = "No Member Exists"
                }
            })
        },
        add: function(){
            var i;
            var vm = this;
            if(confirm("Are You Sure?")){
                if(this.calculateNetInstallement){
                    i =(vm.temporary.value/vm.temporary.months)-((vm.auctionAmount-((vm.commissionPercentage/100)*vm.temporary.value))/vm.temporary.months)
                }else{
                    i = vm.temporary.value/vm.temporary.months
                }
                db.collection("Groups").doc(vm.temporary.name).collection("Members").doc(this.mid).update({
                netInstallment: i,
                chitLifted: true
                }).then(()=>{
                    db.collection("Groups").doc(vm.temporary.name).collection("Members").get().then((query)=>{
                    query.forEach((doc)=>{
                        db.collection("Groups").doc(vm.temporary.name).collection("Members").doc(doc.id).update({
                            netInstallment: i
                        })
                    })
                }).then(()=>{
                         db.collection("Auctions").add({
                            name: vm.temporary.name,
                            value: vm.temporary.value,
                            netInstallment: i,
                            liftedMemberId: vm.mid,
                            month: vm.getMonth(),
                        }).then(()=>{
                            vm.updateAuction = !vm.updateAuction;
                        })
                })
                }) 
            }
        },
        update: function(g){
            var vm = this;
            vm.updateAuction = true;
            vm.temporary = this.groups[g];
        }
    },
    mounted(){var vm = this;
    var a = 0;
    vm.Month = this.getMonth();
        db.collection("Groups").get().then((query)=>{
            query.forEach((doc)=>{
                ++a;
                vm.groups.push({...doc.data(), id: doc.id, auctionAmount: 0, comissionPercentage: 0})
            })
        })
        // console.log(a)
    }

}
</script>

<style lang="scss" scoped>



    button{
                width: 80%;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 0.5em 0;
                border: none;
                background: #2196F3;
            }



  table {
    border-collapse: collapse;
    width:  96%
    }

    table, th, td {
        border: 1px solid black;
        text-align: center;
        padding: 1em;

        .buttons{
            button{
                width: 80%;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 0.5em 0;
                border: none;
            }
        }
    }

    // input{
    //     width: 50%;
    // }

    .comision{
        width: 60%;
    }

    // MODAL CSS

    .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


input{
    margin: 0.4em;
    padding: 0.8em;
}
h4{
    margin: 0.3em;
}
</style>
