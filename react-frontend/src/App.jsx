import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import DistilleriesInfoPage from './pages/DistilleriesInfoPage';
import SlugsInfoPage from './pages/SlugsInfoPage';
import AuctionsInfoPage from './pages/AuctionsInfoPage';
import AuctionsDataPage from './pages/AuctionsDataPage';
import AuctionSlugPage from './pages/AuctionSlugPage';

const App = () => {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/distilleries-info' element={<DistilleriesInfoPage />} />
        <Route path='/slugs-info' element={<SlugsInfoPage />} />
        <Route path='/auctions-info' element={<AuctionsInfoPage />} />
        <Route path='/auctions-data' element={<AuctionsDataPage />} />
        <Route path='/auction-slug' element={<AuctionSlugPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
