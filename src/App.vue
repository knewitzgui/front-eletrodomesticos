<template>
  <div id="app">
      <div class="navbar navbar-expand-lg bg-dark center d-flex justify-content-center">
        <h2 class="text-white">Produtos Front</h2>
      </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col">
          <h4>Adicionar Produto</h4>
          <form @submit.prevent="save_product">
            <label>Nome</label>
            <input required class="form-control" name="name" type="text" placeholder="Nome" v-model="product.name">
            <label>Descrição</label>
            <input required class="form-control" name="description" type="text" placeholder="Descrição" v-model="product.description">
            <label>Tensão</label>
            <input required class="form-control" name="voltage" type="text" placeholder="Tensão" v-model="product.voltage">
            <label>Marca</label>
              <select required class="form-select brands" name="brand_id" v-model="product.brand_id">
                <option v-for="brand of brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
              </select>
            
            <button class="btn btn-primary mt-2">Salvar<i class="material-icons left">save</i></button>
          </form>
        </div>
        <div class="col">
          <h4>Adicionar Marca</h4>
          <form @submit.prevent="create_brand">
            <label>Nome</label>
            <input required class="form-control" type="text" placeholder="Nome" v-model="brand.name">
            <button class="btn btn-primary mt-2">Salvar<i class="material-icons left">save</i></button>
          </form>
        </div>
      </div>
      <div class="table-responsive mt-5">
        <label>Pesquise o que você deseja</label>
        <input type="text" class="form-control mb-3" id="search" placeholder="Digite o nome do produto, marca, descrição ou tensão do produto desejado.">
        <table class="table table-hover" id="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Tensão</th>
              <th>Marca</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product of products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.voltage }}</td>
              <td>{{ product.brand.name }}</td>
              <td>
                <button @click="update_product(product)" class="btn btn-primary" style="margin-right: 10px"><i class="material-icons">create</i></button>
                <button @click="delete_product(product)" class="btn btn-danger"><i class="material-icons">delete_sweep</i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Produtos from './services/products'
  import Marcas from './services/brands'

  export default {
    
    data(){
      return{
        product:{
          id: '',
          name: '',
          description: '',
          voltage: '',
          brand_id: '',
        },
        brand:{
          name: '',
        },
        products: [],
        brands: []
      }
    },

    mounted(){
      this.list_products()

      Marcas.list().then(response => {
        this.brands = response.data
      })
    },

    methods: {
      list_products(){
        Produtos.list().then(response => {
          this.products = response.data
        })
      },
      save_product(){
        if(!this.product.id){
          Produtos.create(this.product).then(response => {
            if(response.status == 200){
              alert('Produto salvo com sucesso!')
            } else{
              alert('Erro ao salvar o produto.')
            }
            this.list_products()
          })
        } else{
          Produtos.update(this.product).then(response => {
            if(response.status == 200){
              alert('Produto atualizado com sucesso!')
            } else{
              alert('Erro ao atualizar o produto.')
            }
            this.list_products()
          })
        }
      },

      create_brand(){
        Marcas.create(this.brand).then(response => {
          if(response.status == 200){
            alert('Marca salva com sucesso!')
          } else{
            alert('Erro ao salvar a marca.')
          }
        })
      },

      update_product(product){
        this.product = product
      },

      delete_product(product){
        Produtos.delete(product).then(response => {
            if(response.status == 202){
              alert('Produto deletado com sucesso!')
            } else{
              alert('Erro ao deletar o produto.')
            }
            this.list_products()
          })
      }
    }
  }
</script>

<style>

</style>
