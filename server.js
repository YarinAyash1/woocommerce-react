const next = require('next');
const express = require('express');
const port = 3001;

const dev = process.env.NODE_ENV !== 'production';
const WooCommerceAPI = require('woocommerce-api');
const wooConfig = require('./wooConfig')
const WooCommerce = new WooCommerceAPI({
    url: wooConfig.siteurl,
    consumerKey: wooConfig.consumer_key,
    consumerSecret: wooConfig.consumer_key,
    wpAPI: true,
    version: 'wc/v1'
});
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare()
    .then( () => {
        const server = express();

		server.get( '/getProducts', ( req, response ) => {
			WooCommerce.get('products', function(err, data, res) {
				response.json( JSON.parse(res) );
			});
		} );

        server.get( '*' ,(req, res) => {
            return handle(req, res)
        });
        server.listen(port, error =>{
            if(error) throw error;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch( ex => {
        console.error(ex.stack);
        process.exit(1);
    })
    