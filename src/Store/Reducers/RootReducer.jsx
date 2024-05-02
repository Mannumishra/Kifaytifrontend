import { combineReducers } from "@reduxjs/toolkit";
import { MaincategoryReducer } from "./MaincategoryReducers";
import { SubcategoryReducer } from "./SubcategoryReducers";
import { BrandReducer } from "./BrandReducers";
import { ProductReducer } from "./ProductReducers";
import { TestimonialReducer } from "./TestimonialReducers";
import { CartReducer } from "./CartReducers";
import { WishlistReducer } from "./WishlistReducers";
import { CheckoutReducer } from "./CheckoutReducers";
import { NewsletterReducer } from "./NewsletterReducers";
import { ContactUsReducer } from "./ContactUsReducers";

export default combineReducers({
    MaincategoryStateData: MaincategoryReducer,
    SubcategoryStateData: SubcategoryReducer,
    BrandStateData: BrandReducer,
    ProductStateData: ProductReducer,
    TestimonialStateData: TestimonialReducer,
    CartStateData: CartReducer,
    WishlistStateData: WishlistReducer,
    CheckoutStateData: CheckoutReducer,
    NewsletterStateData: NewsletterReducer,
    ContactUsStateData: ContactUsReducer
})