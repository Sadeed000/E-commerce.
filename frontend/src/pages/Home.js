import React, { lazy, Suspense } from 'react';

const CategoryList = lazy(() => import('../components/CategoryList'));
const BannerProduct = lazy(() => import('../components/BannerProduct'));
const HorizontalCardProduct = lazy(() => import('../components/HorizontalCardProduct'));
const VerticalCardProduct = lazy(() => import('../components/VerticalCardProduct'));

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <CategoryList />
        <BannerProduct />

        <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
        <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"} />

        <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
        <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
        <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
        <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
        <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
        <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
        <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
        <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
      </div>
    </Suspense>
  );
};

export default Home;
