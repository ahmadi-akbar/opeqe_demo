import "../index.scss";
import React from "react";
import loadable from "@loadable/component";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import selectBan from "../store/selectors/demo/selectBan";

import { Provider as GlobalStateProvider } from "./state";

import { ConectedPrivateRoute } from "./components/PrivateRoute";
import AnimatedSwitch from "./components/AnimatedSwitch";

import Footer from "./components/Footer";
import MainNav from "./components/MainNav";
import ErrorBoundary from "./components/ErrorBoundary";
import BannedPage from "./components/BannedPage";
import LoadingPage from "./components/LoadingPage";

import {
  LOG_IN_PAGE_URL,
  ITEM_INSTRUCTIONS_PAGE_URL,
  SHOPPING_CART_PAGE_URL,
  ORDER_OPTIONS_PAGE_URL,
  RESERVATION_LIST_PAGE_URL,
  RESERVATION_OPTIONS_PAGE_URL,
  PROFILE_PAGE_URL,
  ORDER_HISTORY_PAGE_URL,
  ITEM_SEARCH_PAGE_URL
} from "./config/routing/";

import isMobile from "../functions/isMobile";
import isDemo from "../functions/isDemo";

const ShoppingCartPage = importModule(() =>
  import(
    /* webpackChunkName: "ShoppingCartPage" */ "./components/ShoppingCartPage"
  )
);
const ItemInstructionPage = importModule(() =>
  import(
    /* webpackChunkName: "ItemInstructionPage" */ "./components/ItemInstructionPage"
  )
);
const SignUpPage = importModule(() =>
  import(/* webpackChunkName: "SignUpPage" */ "./components/SignUpPage")
);
const HomePage = importModule(() =>
  import(/* webpackChunkName: "HomePage" */ "./components/HomePage")
);
const OrderOptionsPage = importModule(() =>
  import(
    /* webpackChunkName: "OrderOptionsPage" */ "./components/OrderOptionsPage"
  )
);
const NotFoundPage = importModule(() =>
  import(/* webpackChunkName: "NotFoundPage" */ "./components/NotFoundPage")
);
const ReservationListPage = importModule(() =>
  import(
    /* webpackChunkName: "ReservationListPage" */ "./components/ReservationListPage"
  )
);
const ReservationOptionsPage = importModule(() =>
  import(
    /* webpackChunkName: "ReservationOptionsPage" */ "./components/ReservationOptionsPage"
  )
);
const ProfilePage = importModule(() =>
  import(/* webpackChunkName: "ProfilePage" */ "./components/ProfilePage")
);
const OrderHistoryPage = importModule(() =>
  import(
    /* webpackChunkName: "OrderHistoryPage" */ "./components/OrderHistoryPage"
  )
);
const FilteredItemsPage = importModule(() =>
  import(
    /* webpackChunkName: "FilteredItemsPage" */ "./components/FilteredItemsPage"
  )
);

const PublicRoute = isDemo ? ConectedPrivateRoute : Route;

function Index(props) {
  const { ban } = props;

  preLoadAll(2000);

  return (
    <>
      {" "}
      {ban.isBanned ? (
        <BannedPage ban={ban} />
      ) : (
        <GlobalStateProvider>
          <ErrorBoundary>
            <MainNav />
            <AnimatedSwitch isPage>
              <ConectedPrivateRoute
                path={`/${SHOPPING_CART_PAGE_URL()}`}
                component={ShoppingCartPage}
              />{" "}
              <ConectedPrivateRoute
                path={`/${RESERVATION_LIST_PAGE_URL()}`}
                exact
                component={ReservationListPage}
              />{" "}
              <ConectedPrivateRoute
                path={`/${RESERVATION_OPTIONS_PAGE_URL()}`}
                component={ReservationOptionsPage}
              />{" "}
              <ConectedPrivateRoute
                path={`/${PROFILE_PAGE_URL()}`}
                component={ProfilePage}
              />{" "}
              <ConectedPrivateRoute
                path={`/${ORDER_HISTORY_PAGE_URL()}`}
                component={OrderHistoryPage}
              />{" "}
              <PublicRoute path="/" exact component={HomePage} />{" "}
              <PublicRoute
                path={`/${ITEM_INSTRUCTIONS_PAGE_URL()}`}
                component={ItemInstructionPage}
              />{" "}
              <PublicRoute
                path={`/${ORDER_OPTIONS_PAGE_URL()}`}
                component={OrderOptionsPage}
              />{" "}
              <PublicRoute
                path={`/${ITEM_SEARCH_PAGE_URL()}`}
                component={FilteredItemsPage}
              />{" "}
              <Route path={`/${LOG_IN_PAGE_URL()}`} component={SignUpPage} />{" "}
              <Route component={NotFoundPage} />{" "}
            </AnimatedSwitch>{" "}
            {!isMobile && <Footer />}{" "}
          </ErrorBoundary>{" "}
        </GlobalStateProvider>
      )}{" "}
    </>
  );
}

function importModule(importer) {
  return loadable(() => importer(), {
    fallback: <LoadingPage />
  });
}

const preLoadAll = startLoading => {
  let index = 0;

  const incerementIndex = () => {
    index += 1;
    return startLoading + 0.2 * index;
  };

  preload(ShoppingCartPage, incerementIndex());
  preload(ItemInstructionPage, incerementIndex());
  preload(SignUpPage, incerementIndex());
  preload(HomePage, incerementIndex());
  preload(OrderOptionsPage, incerementIndex());
  preload(NotFoundPage, incerementIndex());
  preload(ReservationListPage, incerementIndex());
  preload(ReservationOptionsPage, incerementIndex());
  preload(ProfilePage, incerementIndex());
  preload(OrderHistoryPage, incerementIndex());
  preload(FilteredItemsPage, incerementIndex());
};

const preload = (component, timeOut) => {
  setTimeout(() => component.preload(), timeOut);
};

export default connect(
  state => ({
    ban: selectBan(state)
  }),
  {}
)(Index);
