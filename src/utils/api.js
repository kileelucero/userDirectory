import axios from "axios"
export default {
    employeeExtract: function(){
        return axios.get("https://randomuser.me/api/?inc=name,email,dob,picture,phone&nat=us&results=50")
    }
};