const fs= require ("fs");

class ProductManager{
    #path="./Usuarios.json"
    #accumulator=0;
    #products=[];

    async addProduct (title, description, code, price, thumbnail, stock){
        const productWithSameCodeExists = this.#products.some(
            (p) => p.code == code
           );
          
           if (productWithSameCodeExists){
               throw new Error ("Producto ya existe")
           }
          
           if (!title || !description || !price || !thumbnail|| !stock ){
               throw new Error("Error")
           }
          
           const newProduct ={
               id: this.#accumulator,
               title,
               description,
               code,
               price,
               thumbnail,
               stock
           };
          
           this.#accumulator++;
    
        const users = await this.consultarUsuarios();
        const updatedUsers = [...this.#products, newProduct];
        await fs.promises.writeFile(this.#path, JSON.stringify(updatedUsers));
    }
    
    async consultarUsuarios(){
        try{
        const users = await fs.promises.readFile(this.#path,"utf-8");
        return JSON.parse(users);
    } catch (e){
        return[];
    }
    }
    getProductById(indexOF){
        return(this.#products[indexOF])
        }
    getEraseById(indexOF){
        return(delete this.#products[indexOF])
        }
    getUpdateById(indexOF,title, description, code, price, thumbnail, stock){
        const UpdateProduct ={
            id: indexOF,
            title,
            description,
            code,
            price,
            thumbnail,
            stock
        };
        this.#products[indexOF] = {...this.#products[indexOF], UpdateProduct}
        }    

}

async function main(){
    const manager =new ProductManager();
    console.log(await manager.consultarUsuarios());
    await manager.addProduct("Manzana","Es una manzana", "codigo1",5,"/ruta/2",2);
    await manager.addProduct("Banana","Es una banana", "codigo2",6,"/ruta/3",3);
    await manager.addProduct("Cereza","Es una cereza", "codigo3",4,"/ruta/1",1);
    console.log(manager.getProductById(3));
    console.log(await manager.consultarUsuarios());
    console.log(manager.getEraseById(1));
}
main();