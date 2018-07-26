 import axios from 'axios'
 
 const axiosget = function(url) {
 	return axios({
 		 method: 'get',  
         url: 'http://cangdu.org:8001/'+url
 	}).then(function(response) {
// 		console.log(response)
 		return {data: response.data}
 	})
 }

export default {
	axiosget
}
