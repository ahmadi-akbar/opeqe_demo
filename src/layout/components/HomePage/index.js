import React, { useEffect, useState } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import queryString from "query-string";

import isMobile from "../../../functions/isMobile";

import toggleFavorite from "../../../store/actions/menu/toggleFavorite";
import selectUserData from "../../../store/selectors/user/selectUserData";
import selectGroupedMenuItems from "../../../store/selectors/menu/selectGroupedMenuItems";
import {
  DATA_FETCH_PENDING,
  DATA_FETCH_FULFILLED,
  DATA_FETCH_REJECTED
} from "../../../store/config/actionNames";

import {
  ITEM_INSTRUCTIONS_PAGE_URL,
  ITEM_INSTRUCTIONS_URL_PARAMS,
  HOME_PAGE_URL,
  ITEM_SEARCH_PAGE_URL
} from "../../config/routing";
import {
  HOME_PAGE_TOP_PROMOTION_PROPS,
  HORIZONTAL_LIST_FRAME_SIZE,
  HOME_PAGE_FOOD_CARD_PROPS,
  HOME_PAGE_SPECIAL_FOOD_CARD_PROPS,
  HOME_PAGE_COUPONS_FOOD_CARD_PROPS,
  HOME_PAGE_HAPPY_HOUR_FOOD_CARD_PROPS,
  HOME_PAGE_FAV_FOOD_CARD_PROPS,
  HOME_PAGE_CATERING_FOOD_CARD_PROPS
} from "../../config/layout";

import Grid from "@material-ui/core/Grid";

import GiftCardPromotion from "../GiftCardPromotion";
import OrderOptionsBar from "../OrderOptionsBar";
import MobileOrderOptionsBar from "../MobileOrderOptionsBar";
import HorizontalListContainer from "../HorizontalListContainer";
import FoodCard from "../FoodCard";
import ItemInstructionModal from "../ItemInstructionModal";
import PageTopPromotion from "../PageTopPromotion";
import MobileAppPromotion from "../MobileAppPromotion";
import ExtraOrderPromotion from "../ExtraOrderPromotion";

import SpecialDetailsNotification from "../SpecialDetailsNotification";

export function Index(props) {
  const {
    className,
    style,
    status,
    menuItems: {
      data: { groups: itemGroups, feeLabel, deliveryFee },
      status: {
        [DATA_FETCH_PENDING]: itemsLoading,
        [DATA_FETCH_REJECTED]: itemsError,
        [DATA_FETCH_FULFILLED]: itemsFetched
      }
    },
    user: { data: user },
    toggleFavorite,
    history,
    location,
    match,
    staticContext,
    ...others
  } = props;

  const breakpoints = {
    xs: 11,
    sm: 11,
    md: 11,
    lg: 11,
    xl: 11
  };

  const [showSpecialDetails, setShowSpecialDetails] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const params = queryString.parse(location.search);
    const currentItemId = params.itemId;
    const currentItemCuisine = params.cuisine;
    const currentItemMeal = params.meal;
    const currentItemCourse = params.course;

    if (
      isMobile &&
      currentItemId &&
      currentItemCuisine &&
      currentItemMeal &&
      currentItemCourse
    ) {
      const dedicatedPageURL = ITEM_INSTRUCTIONS_PAGE_URL({
        id: currentItemId,
        cuisine: currentItemCuisine,
        course: currentItemCourse,
        meal: currentItemMeal
      });
      history.replace(`/${dedicatedPageURL}`);
    } else {
      if (currentItemId) {
        setItemId(currentItemId);
      } else {
        setItemId(null);
      }
    }
  }, [location.search]);

  const isSkeleton =
    (!itemGroups.length && (itemsLoading || itemsError)) || !itemGroups.length;

  function closeItemModal() {
    history.push(`/${HOME_PAGE_URL()}`);
  }

  function itemlabelClick(item) {
    setSelectedItem(item);
    setShowSpecialDetails(true);
  }

  function handleSpecialUse() {
    setShowSpecialDetails(false);
    setTimeout(() => history.push(getItemHref(selectedItem)), 400);
  }

  function handleFav(id, value) {
    toggleFavorite(id);
  }

  const middleOfGroups = parseInt(itemGroups.length / 2);

  return (
    <>
      <SpecialDetailsNotification
        onUse={handleSpecialUse}
        title={selectedItem && selectedItem.special.title}
        description={selectedItem && selectedItem.special.description}
        img={selectedItem && selectedItem.image}
        open={showSpecialDetails}
        onClose={() => setShowSpecialDetails(false)}
      />{" "}
      <div
        className={cn("home-page-l1", {
          mobile: isMobile
        })}
        style={{
          ...style
        }}
        {...others}
      >
        <PageTopPromotion {...HOME_PAGE_TOP_PROMOTION_PROPS} />{" "}
        <div className="plcaholder"> &nbsp; </div>{" "}
        <div className="page-body">
          {" "}
          {isMobile ? (
            <MobileOrderOptionsBar />
          ) : (
            <OrderOptionsBar itemBreakpoints={breakpoints} />
          )}{" "}
          <Grid className="page-content" container justify="center">
            <Grid container item {...breakpoints}>
              {" "}
              {groupItems(itemGroups, isSkeleton).map(
                renderHorizontalList({
                  isSkeleton,
                  itemlabelClick,
                  handleFav,
                  hideFav: !user.token,
                  bottomLabel: feeLabel,
                  deliveryFee,
                  insertBefore: {
                    [middleOfGroups]: (
                      <MobileAppPromotion className="app-promotion" />
                    )
                  }
                })
              )}{" "}
              <GiftCardPromotion className="gift-card-promotion" />{" "}
              {!isMobile && (
                <ExtraOrderPromotion className="extra-order-promotion" />
              )}{" "}
            </Grid>{" "}
          </Grid>{" "}
        </div>{" "}
        {itemId && (
          <ItemInstructionModal
            open={true}
            instructionsProps={{
              itemId: itemId
            }}
            onClose={closeItemModal}
          />
        )}{" "}
      </div>{" "}
    </>
  );
}

const renderHorizontalList = ({
  isSkeleton,
  itemlabelClick,
  handleFav,
  hideFav,
  bottomLabel,
  deliveryFee,
  insertBefore = {}
}) => ({ items, title, subTitle, type: groupType }, index) => {
  if (!items.length) {
    return null;
  }

  return (
    <>
      {" "}
      {insertBefore[index] && insertBefore[index]}{" "}
      <HorizontalListContainer
        key={index}
        className="horizontal-list"
        title={title}
        subTitle={subTitle}
        linkTarget="/"
        freeScroll={isMobile}
        frameSize={HORIZONTAL_LIST_FRAME_SIZE}
        skeleton={isSkeleton}
        listProps={{
          listContainerProps: {
            className: "list-container"
          }
        }}
      >
        {items.map((item, index) => {
          const { id, special, ...others } = item;

          let href;
          let filterLinks;
          if (!isSkeleton) {
            href = getItemHref(item);
            filterLinks = createFilterLinks(item);
          }

          return (
            <div key={id}>
              <div className="card-container">
                {" "}
                {isSkeleton ? (
                  <FoodCard
                    skeleton={true}
                    layoutProps={getFoodCardProps(groupType)}
                  />
                ) : (
                  <FoodCard
                    {...others}
                    onLabelClick={() => itemlabelClick(item)}
                    onFav={handleFav}
                    label={special.title}
                    timeRemaining={special.remainingTime}
                    href={href}
                    subTitleHref={filterLinks.sub}
                    categoryHrefs={filterLinks.cat}
                    id={id}
                    hideFav={hideFav}
                    bottomLabel={bottomLabel}
                    layoutProps={getFoodCardProps(groupType)}
                  />
                )}{" "}
              </div>{" "}
            </div>
          );
        })}{" "}
      </HorizontalListContainer>{" "}
    </>
  );
};

const getFoodCardProps = groupType => {
  switch (groupType) {
    case "happyhour":
      return HOME_PAGE_HAPPY_HOUR_FOOD_CARD_PROPS;
    case "coupon":
      return HOME_PAGE_COUPONS_FOOD_CARD_PROPS;
    case "special":
      return HOME_PAGE_SPECIAL_FOOD_CARD_PROPS;
    case "catering":
      return HOME_PAGE_CATERING_FOOD_CARD_PROPS;
    case "favourite":
      return HOME_PAGE_FAV_FOOD_CARD_PROPS;
    default:
      return HOME_PAGE_FOOD_CARD_PROPS;
  }
};

const getItemHref = item => {
  return `${HOME_PAGE_URL()}?${ITEM_INSTRUCTIONS_URL_PARAMS({
    id: item.id,
    cuisine: item.cuisine,
    course: item.course,
    meal: item.meal
  })}`;
};

function groupItems(itemGroups, isSkeleton) {
  let groups = [];
  if (isSkeleton) {
    const items = [];
    for (let i = 0; i < HORIZONTAL_LIST_FRAME_SIZE; i++) {
      items.push({
        id: i
      });
    }
    for (let i = 0; i < 3; i++) {
      groups.push({
        items: items
      });
    }
  } else {
    groups = itemGroups;
  }
  return groups;
}

const createFilterLinks = item => {
  const out = {};
  out.sub = ITEM_SEARCH_PAGE_URL({
    filterTypes: ["menuTitle"],
    filterValue: item.subTitle
  });
  out.cat = item.categories.map(
    category =>
      ITEM_SEARCH_PAGE_URL({
        filterTypes: [category.searchType],
        filterValue: category.text
      }),
    []
  );

  return out;
};

export default connect(
  state => {
    return {
      menuItems: selectGroupedMenuItems(state),
      user: selectUserData(state)
    };
  },
  {
    toggleFavorite
  }
)(Index);
