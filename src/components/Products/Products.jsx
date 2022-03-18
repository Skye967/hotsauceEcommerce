import React from 'react';
import {Grid} from '@material-ui/core'
import Product from './Product/Product.jsx';
import useStyles from './styles'

// const products = [
//     {id: 1, name: 'Habenero Hot Sauce', description: 'Smokey hobenero hot sauce.', price: '$5', image: 'https://images.squarespace-cdn.com/content/v1/5680df18a128e603baa69c63/1569627611301-762UATTA058DJT7LLVWE/Mauna+Kea+Madness+Center.jpg'},
//     {id: 2, name: 'Ghost Pepper Hot Sauce', description: 'Sweet ghost pepper hot sauce.', price: '$5', image: 'https://d2j6dbq0eux0bg.cloudfront.net/images/10413599/1915841333.jpg'},
// ];

const Products = ({products, onAddToCart}) => {
    const classes = useStyles();

    return(
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} lg={3}> 
                        <Product product={product} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;