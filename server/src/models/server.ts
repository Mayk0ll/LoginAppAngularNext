import express = require('express') ;
import routesProduct from '../routes/product';
import routesUser from '../routes/user';
import { Product } from './product.model';
import { User } from './user.model';

export class Server{

    private app: express.Application;
    private port: string;


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        
        this.listen();
        this.dbConnect();
        this.midlewares();
        this.routes();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server habilitado ${this.port}`)
        })
    }

    routes(){
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/user', routesUser);
    }

    midlewares(){
        this.app.use(express.json());
    }

    async dbConnect(){
        try {
            await Product.sync();
            await User.sync();
            console.log('Connection complete')
        } catch (error) {
            console.log('Connection Error '+error)
            
        }
    }
}