# Urban District Store 💟
<p align="center">
<img width="766" alt="Screenshot 2024-08-10 at 9 15 15 PM" src="https://github.com/user-attachments/assets/93bccf76-d213-40c2-939b-02cbed2748af">
</p>


###### 1. Product Details Page
<p align="center">
<img width="826" height="640" alt="Image" src="https://github.com/user-attachments/assets/ac2158af-2eb3-45c8-b458-b45e52989a5c" />

</p>


###### 2. Shopping Bag Page
<p align="center">
<img width="755" height="640" alt="Image" src="https://github.com/user-attachments/assets/4fc54046-8a04-4d11-979e-090fb4c82111" />
</p>

###### 3. Add New Product Page for Admin Account
<p align="center">
 <img width="766" height="640" alt="Image" src="https://github.com/user-attachments/assets/97359127-fe02-4fef-b2f1-64aa5622f621" />
</p>


## Description

Welcome to Urban District, a responsive shopping mall web application designed to provide users with a seamless shopping experience. Built with React and Tailwind CSS, this application features a dynamic product catalog, a user-friendly shopping bag, and smooth user authentication through Firebase.

## Features

- **User Authentication**: Secure login and logout using Google accounts via Firebase Authentication.
-  **Responsive Design**: The website is fully responsive and adjusts to different screen sizes for optimal viewing.
- **Admin Functionality**: Admin users have access to add new products to the store.
- **Protected Shopping Bag**: The shopping bag is only accessible to logged-in users, ensuring that user-specific data remains secure.
- **Product Catalog**: Browse a wide range of products with detailed descriptions, prices, and images.
- **Product Detail Page**: View detailed information about each product, including size options and customer reviews.
- **Shopping Bag**: Add products to the shopping bag, adjust quantities, and see real-time updates.
- **Order Summary**: View a summary of your shopping bag, including subtotal, shipping costs, and the total amount.


## Technologies Used

- **React**: A powerful JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for creating responsive designs.
- **React Router**: For handling navigation and routing.
- **React Query**: For efficient data fetching and caching.
- **Firebase**: For user authentication and real-time database management.
- **Cloudinary**: For uploading and managing product images.


## Components

### 1. Navbar

The `Navbar` component provides navigation across the application, including links to the product catalog, shopping bag, and user profile.
 
### 2. Banner

The `Banner` component displays a prominent banner on the homepage.

### 3. User

The `User` component displays the user's profile information.

### 4. Products

The `Products` component lists all the products available in the store.

### 5. ProductCard

The `ProductCard` component represents an individual product in the product list. It displays the product image, title, category, and price. Clicking on the product navigates to the product detail page.

### 6. CartItem

The `CartItem` component represents an individual item in the shopping bag, allowing users to adjust quantities or remove the item.

### 7. CartStatus

The `CartStatus` component shows the number of items currently in the shopping bag, displayed as a badge on the shopping bag icon.

### 8. PriceCard

The `PriceCard` component displays the price details, including the subtotal, shipping costs, and total amount in the order summary.


## Context

### AuthContext

The `AuthContext` handles user authentication status across the application, ensuring that user data is accessible and consistent.


## Hooks

### 1. useCart

The `useCart` hook provides an interface for managing the shopping bag, including adding, updating, and removing items.

### 2. useProducts

The `useProducts` hook provides an interface for fetching product data and managing product-related mutations.


## Pages

### 1. AllProducts

The `AllProducts` page displays all available products in the store.
 
### 2. Home

The `Home` page serves as the landing page for the application, featuring the main banner and featured products.

### 3. MyCart

The `MyCart` page displays the user's shopping bag with the ability to modify product quantities and proceed to checkout. This page is protected and only accessible to logged-in users.

### 4. NewProduct

The `NewProduct` page allows authorized admin users to add new products to the store.

### 5. ProductDetail

The `ProductDetail` page provides detailed information about a selected product, including size options, customer reviews, and the ability to add the product to the shopping bag.

### 6. ProtectedRoute

The `ProtectedRoute` component restricts access to certain pages based on the user's authentication status.


## Styling

The application uses `Tailwind CSS` for styling. Tailwind CSS allows for easy and efficient styling by applying utility classes directly in the JSX code. The application supports a responsive design, adjusting to various screen sizes for an optimal user experience.




