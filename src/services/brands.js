import { http } from './config'

export default{
    list:() =>{
        return http.get('marcas')
    },

    create:(brand) =>{
        return http.post('marcas', brand)
    }
}