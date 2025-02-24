import { createBrowserRouter } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import App from '../App';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassowrd'));
const SignUp = lazy(() => import('../pages/SignUp'));
const AdminPanel = lazy(() => import('../pages/AdminPanel'));
const AllUsers = lazy(() => import('../pages/AllUsers'));
const AllProducts = lazy(() => import('../pages/AllProducts'));
const CategoryProduct = lazy(() => import('../pages/CategoryProduct'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart'));
const SearchProduct = lazy(() => import('../pages/SearchProduct'));

// Fallback loading component
const Loader = <div>Loading...</div>;

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: (
                    <Suspense fallback={Loader}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "login",
                element: (
                    <Suspense fallback={Loader}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "forgot-password",
                element: (
                    <Suspense fallback={Loader}>
                        <ForgotPassword />
                    </Suspense>
                ),
            },
            {
                path: "sign-up",
                element: (
                    <Suspense fallback={Loader}>
                        <SignUp />
                    </Suspense>
                ),
            },
            {
                path: "product-category",
                element: (
                    <Suspense fallback={Loader}>
                        <CategoryProduct />
                    </Suspense>
                ),
            },
            {
                path: "product/:id",
                element: (
                    <Suspense fallback={Loader}>
                        <ProductDetails />
                    </Suspense>
                ),
            },
            {
                path: "cart",
                element: (
                    <Suspense fallback={Loader}>
                        <Cart />
                    </Suspense>
                ),
            },
            {
                path: "search",
                element: (
                    <Suspense fallback={Loader}>
                        <SearchProduct />
                    </Suspense>
                ),
            },
            {
                path: "admin-panel",
                element: (
                    <Suspense fallback={Loader}>
                        <AdminPanel />
                    </Suspense>
                ),
                children: [
                    {
                        path: "all-users",
                        element: (
                            <Suspense fallback={Loader}>
                                <AllUsers />
                            </Suspense>
                        ),
                    },
                    {
                        path: "all-products",
                        element: (
                            <Suspense fallback={Loader}>
                                <AllProducts />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
]);

export default router;
