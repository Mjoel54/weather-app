import dotenv from 'dotenv';
import express, { Application, Router } from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.static('client/dist'));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Implement middleware to connect the routes
app.use(routes);

// Function to print all routes
function printRoutes(app: Application | Router): void {
    // Type assertion to access private properties safely
    const stack = (app as any)._router?.stack || [];
    
    stack.forEach((middleware: any) => {
        if (middleware.route) {
            // Direct routes
            const route = middleware.route;
            const methods = Object.keys(route.methods).filter(method => route.methods[method]).join(', ').toUpperCase();
            console.log(`Route: ${route.path}, Method: ${methods}`);
        } else if (middleware.name === 'router' && middleware.handle.stack) {
            // Nested routers
            middleware.handle.stack.forEach((handler: any) => {
                if (handler.route) {
                    const route = handler.route;
                    const methods = Object.keys(route.methods).filter(method => route.methods[method]).join(', ').toUpperCase();
                    console.log(`Route: ${route.path}, Method: ${methods}`);
                }
            });
        }
    });
}

// Start the server and print all routes
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
    printRoutes(app);
});
