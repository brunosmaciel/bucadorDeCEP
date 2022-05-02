import './assets/css/style.css';
class BuscadorDeCEP{
    constructor(cep){
        Object.defineProperties(this,{
            cep:{
                value: cep,
                writable: false,
                configurable:false
            },
            baseUrl:{
                writable:false,
                configurable:false,
                value:'https://viacep.com.br/ws/'
            },
            buttonSearch:{
                value: document.querySelector('.btn-search'),
                writable: false,
                configurable:false
            },
            input:{
                value:document.querySelector('#input-cep'),
                writable: false,
                configurable:false
            },
            cep:{
                value: document.querySelector('.cep'),
                writable: false,
                configurable:false
            },
            rua:{
                value: document.querySelector('.rua'),
                writable: false,
                configurable:false
            },
            bairro:{
                value:document.querySelector('.bairro'),
                writable: false,
                configurable:false
            },
            cidade:{
                value: document.querySelector('.cidade'),
                writable: false,
                configurable:false
            },
            estado:{
                value: document.querySelector('.estado'),
                writable: false,
                configurable:false
            }
            
            
        })
        
        
    }
    start(){
       this.getCepFromInput() 
        
    }
    httpRequest(cep){
        axios(`${this.baseUrl}${cep}/json/`)
        .then(response => {
           const responseObj = response.data
           if(Object.keys(responseObj).length === 1){
                this.invalidCEPError()
                this.clearInput()
           }
           else{
               this.addToDOM(responseObj)
               this.clearInput()
           }
        })
        .catch(e => {
            this.clearDOM()
            alert('Infelizmente ocorreu um erro, tente novamente em alguns instantes')
        })
            

    }
    getCepFromInput(){
        this.buttonSearch.addEventListener('click', e =>{
            
            if(this.input.value === ''){
                 this.handleEmptyInput()
                 
                 return
            }
            
           this.httpRequest(this.input.value)
           
           
        })
    }
    handleEmptyInput(){
       
       
        
    }
    addToDOM(dados){
        this.cep.innerHTML = `CEP: ${dados.cep}`
        this.rua.innerHTML = dados.logradouro
        this.bairro.innerHTML = `Bairro: ${dados.bairro}`
        this.cidade.innerHTML = `Cidade: ${dados.localidade}`
        this.estado.innerHTML = `UF: ${dados.uf}` 
    }
    clearDOM(){
        this.cep.innerHTML = ''
        this.rua.innerHTML = ''
        this.bairro.innerHTML = ''
        this.cidade.innerHTML = ''
        this.estado.innerHTML = ''
    }

    invalidCEPError(){
        this.cep.innerHTML = 'CEP INVALIDO'
        this.rua.innerHTML = ''
        this.bairro.innerHTML = ''
        this.cidade.innerHTML = ''
        this.estado.innerHTML = ''
    }
    clearInput(){
        this.input.value = ''
    }
    
 
    
    
    
        
    
}

const cep = new BuscadorDeCEP()
cep.start()

