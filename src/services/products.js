import { http } from './config'

export default{
    list:() =>{
        return http.get('produtos')
    },

    create:(product) =>{
        return http.post('produtos', product)
    },

    update:(product) =>{
        return http.put('produtos/'+product.id, product)
    },

    delete:(product) =>{
        return http.delete('produtos/'+product.id)
    }
}