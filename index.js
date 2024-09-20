import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import sequelize from './config/database.js';
import ProductCategoryRoute from './routes/productCategory.route.js';
import ProductRoute from './routes/product.route.js';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/categories', ProductCategoryRoute);
app.use('/api/products', ProductRoute);


(async () => {
  try {
    await sequelize.sync();
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
})();
