import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import sequelize from './config/database.js';
import ProductCategoryRoute from './routes/productCategory.route.js';
import ProductRoute from './routes/product.route.js';
import CartRoute from './routes/cart.route.js';
import cors from 'cors'
import morgan from 'morgan';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import VoucherRoute from './routes/voucher.route.js';
import AddressRoute from './routes/address.route.js';
import TransactionRoute from './routes/transaction.route.js';
import FAQRoute from './routes/faq.route.js';
import PostRoute from './routes/post.route.js';
import { getPickUpPointService, storeAllCityService, storeAllProvinceService } from './services/address.service.js';
import { migrateAboutPage, migratePage, migrateWhyContent } from './services/page.service.js';
import PageRoute from './routes/page.route.js';
import ContactRoute from './routes/contact.route.js';
import { migrateContactService } from './services/contact.service.js';
import PromoRoute from './routes/promo.route.js';
import { checkPromoService } from './services/promo.service.js';
import EmailRoute from './routes/email.route.js';
import BannerRoute from './routes/banner.route.js';
import { migrateBanner } from './services/banner.service.js';
import { migrateAdminService } from './services/user.service.js';
import RatingRoute from './routes/rating.route.js';
import CarouselRoute from './routes/carousel.route.js';
import LocationRoute from './routes/location.route.js';
import FreeOngkirRoute from './routes/freeOngkir.route.js';
import { migrateFreeOngkirService } from './services/freeOngkir.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// app.use(cors())
app.use(
  cors({
    origin: '*',
    credentials: true, // Set to false if cookies are not needed
  })
);
// app.use(express.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(morgan('dev'));

app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.use('/api/users', userRoute);
app.use('/api/categories', ProductCategoryRoute);
app.use('/api/products', ProductRoute);
app.use('/api/carts', CartRoute);
app.use('/api/vouchers', VoucherRoute);
// app.use('/api/voucherTypes', VoucherTypeRoute);
app.use('/api/addresses', AddressRoute);
app.use('/api/transactions', TransactionRoute);
app.use('/api/faqs', FAQRoute);
app.use('/api/posts', PostRoute);
app.use('/api/pages', PageRoute);
app.use('/api/contacts', ContactRoute);
app.use('/api/promos', PromoRoute);
app.use('/api/emails', EmailRoute);
app.use('/api/banners', BannerRoute);
app.use('/api/ratings', RatingRoute);
app.use('/api/carousels', CarouselRoute);
app.use('/api/locations', LocationRoute);
app.use('/api/free/ongkir', FreeOngkirRoute);

(async () => {
  try {
    // await sequelize.sync({ force:true, alter: true });
    await sequelize.sync();
    
    await migrateAdminService();
    await storeAllProvinceService();
    await storeAllCityService();
    await migratePage();
    await migrateAboutPage();
    await migrateContactService();
    await migrateBanner();
    await migrateWhyContent();
    await migrateFreeOngkirService();

    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
})();
