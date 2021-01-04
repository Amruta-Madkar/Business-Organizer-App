//display products
class Product{
    constructor(product_name,stock,customers){
        this.product_name = product_name;
        this.stock = stock;
        this.customers = customers;
    }
}
//UI class
class UI{
    static displayProducts (){
        
        const products = Store.getProducts();
        
        products.forEach((product)=>UI.addProductToList(product));
    }

    static addProductToList(product){
        const list = document.querySelector('#product-list');
        const row = document.createElement('tr');
        row.innerHTML =`
        <td>${product.product_name}</td>
        <td>${product.stock}</td>
        <td>${product.customers}</td>
        <td><a href ="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static removeProduct(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }

    }
    static showAlert(message, className) {
       const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#product-form');
        container.insertBefore(div, form);
    
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
      }
    static clearFields(){
        document.querySelector('#productname').value = '';
        document.querySelector('#stock').value = '';
        document.querySelector('#customers').value = '';


    }
}

 


//Store class
class Store {
    static getProducts() {
      let products;
      if(localStorage.getItem('products') === null) {
        products = [];
      } else {
        products = JSON.parse(localStorage.getItem('products'));
      }
  
      return products;
    }
  
    static addProducts(product) {
      const products = Store.getProducts();
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
    }
  
    static removeProduct(product_name) {
      const products = Store.getProducts();
  
      products.forEach((product, index) => {
        if(product.product_name === product_name) {
            products.splice(index, 1);
        }
      });
  
      localStorage.setItem('products', JSON.stringify(products));
    }
  }

//Event: Display products
document.addEventListener('DOMContentLoaded',UI.displayProducts);


//Event: Add Products
document.querySelector('#product-form').addEventListener('submit',(e)=>{

    //prevent default values
    e.preventDefault();

    //get form fields values
    const product_name = document.querySelector('#productname').value;
    const stock = document.querySelector('#stock').value;
    const customers = document.querySelector('#customers').value;
    
    //validation
    if(product_name === '' || stock === '' || customers === ''){
       UI.showAlert("Please fill all feilds" , 'danger');
    }
    else{
        //instantiate product
        const product = new Product(product_name, stock, customers);
        

       //Add  product to list

       UI.addProductToList(product);
       //Add product to Store
       Store.addProducts(product);

       //show message
       UI.showAlert("Product Added !!",'success');

       //clear fields values

       UI.clearFields();
    }
    
});

//Event: Remove Products

document.querySelector('#product-list').addEventListener('click' , (e)=>{
        UI.removeProduct(e.target)

        Store.removeProduct(e.target.parentElement.previousElementSibling.textContent);
        //show message
       UI.showAlert("Product Removed !!",'success');
});

