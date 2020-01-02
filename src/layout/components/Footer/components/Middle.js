import React from "react";
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import OpeqeLogo from "../../OpeqeLogo";

import Link from "./Link";
import LinkGroup from "./LinkGroup";

import {
  ORDER_HISTORY_PAGE_URL,
  ORDER_HISTORY_RECENT_PAGE_URL,
  RESERVATION_LIST_PAGE_URL,
  RESERVATION_DETAILS_PAGE_URL,
  PROFILE_PROMO_PAGE_URL,
  HOME_PAGE_URL,
  PROFILE_INVITE_PAGE_URL,
  ITEM_INSTRUCTIONS_URL_PARAMS
} from "../../../config/routing";

export default function(props) {
  const {
    setOrderType,
    history,
    className,
    style,
    breakpoints,
    freeFood,
    specials,
    ...others
  } = props;

  function handleOrderType(type) {
    setOrderType(type);
    history.push(`/${HOME_PAGE_URL()}`);
  }

  return (
    <Grid
      className={cn("middle-l2", className)}
      style={{
        ...style
      }}
      container
      item
      justify="flex-start"
      {...breakpoints}
      {...others}
    >
      <Grid className="links" container item justify="flex-start">
        <LinkGroup>
          <div className="logo-container">
            <OpeqeLogo
              className="logo"
              showText
              textSize="12"
              color="light"
              width="120"
            />
          </div>{" "}
        </LinkGroup>{" "}
        <LinkGroup header="Main Menu">
          <Link onClick={() => handleOrderType("pickup")} to="#">
            Pickup{" "}
          </Link>{" "}
          <Link onClick={() => handleOrderType("delivery")} to="#">
            Delivery{" "}
          </Link>{" "}
        </LinkGroup>{" "}
        <LinkGroup header="Orders">
          <Link to={`/${ORDER_HISTORY_PAGE_URL()}`}>Upcoming Orders </Link>{" "}
          <Link to={`/${ORDER_HISTORY_RECENT_PAGE_URL()}`}>Recent Orders </Link>{" "}
        </LinkGroup>{" "}
        <LinkGroup header="Reservation">
          <Link to={`/${RESERVATION_LIST_PAGE_URL()}`}>
            Recent Reservation{" "}
          </Link>{" "}
          <Link to={`/${RESERVATION_DETAILS_PAGE_URL({ isWait: true })}`}>
            Wait To Be Seated{" "}
          </Link>{" "}
        </LinkGroup>{" "}
        <LinkGroup header="Profile">
          <Link to={`/${PROFILE_PROMO_PAGE_URL()}`}>Promos & Credits </Link>{" "}
          <Link to={`/${PROFILE_PROMO_PAGE_URL()}`}>Rewards </Link>{" "}
        </LinkGroup>{" "}
        {specials.length > 0 && (
          <LinkGroup header="Special Offers">
            {specials.slice(0, 4).map(special => {
              const href = getItemHref(special);
              return (
                <Link key={special.id} to={href}>
                  {" "}
                  {special.title}{" "}
                </Link>
              );
            })}{" "}
          </LinkGroup>
        )}{" "}
        <LinkGroup header="Support">
          <Link to="#">Contact Us </Link>
          <Link to="#">Live Chat </Link>{" "}
        </LinkGroup>{" "}
        {freeFood && (
          <LinkGroup header="FREE FOOD">
            <Link to={`/${PROFILE_INVITE_PAGE_URL()}`}> {freeFood} </Link>{" "}
          </LinkGroup>
        )}{" "}
      </Grid>{" "}
    </Grid>
  );
}

const getItemHref = item => {
  return `/${HOME_PAGE_URL()}?${ITEM_INSTRUCTIONS_URL_PARAMS({
    id: item.id,
    cuisine: item.cuisine,
    course: item.course,
    meal: item.meal
  })}`;
};
