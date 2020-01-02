import React, { useEffect, useState } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import queryString from "query-string";

import FilteredItems from "../FilteredItems";
import GridList from "../GridList";

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
  ITEM_SEARCH_PAGE_URL
} from "../../config/routing";
import {
  ITEM_SEARCH_PAGE_TOP_PROMOTION_PROPS,
  HORIZONTAL_LIST_FRAME_SIZE,
  SEARCH_PAGE_FOOD_CARD_PROPS
} from "../../config/layout";

import Grid from "@material-ui/core/Grid";

import OrderOptionsBar from "../OrderOptionsBar";
import ItemInstructionModal from "../ItemInstructionModal";
import PageTopPromotion from "../PageTopPromotion";

import FoodCard from "./components/FoodCard";

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

  const { filterType: filterTypes, filterValue } = match.params;

  const isSkeleton =
    (!itemGroups.length && (itemsLoading || itemsError)) || !itemGroups.length;

  function closeItemModal() {
    history.push(
      `/${ITEM_SEARCH_PAGE_URL({ filterTypes: [filterTypes], filterValue })}`
    );
  }

  function itemlabelClick(item) {
    setSelectedItem(item);
    setShowSpecialDetails(true);
  }

  function handleSpecialUse() {
    setShowSpecialDetails(false);
    setTimeout(
      () =>
        history.push(`/${getItemHref(selectedItem, filterTypes, filterValue)}`),
      400
    );
  }

  function handleFav(id, value) {
    toggleFavorite(id);
  }

  function mapItemData(data) {
    const href = getItemHref(data, filterTypes, filterValue);

    const filterLinks = createFilterLinks(data);

    return {
      cardProps: {
        ...data,
        onLabelClick: () => itemlabelClick(data),
        onFav: handleFav,
        label: data.special.title,
        timeRemaining: data.special.remainingTime,
        href: href,
        id: data.id,
        hideFav: !user.token,
        bottomLabel: feeLabel,
        subTitleHref: filterLinks.sub,
        categoryHrefs: filterLinks.cat,
        layoutProps: SEARCH_PAGE_FOOD_CARD_PROPS
      }
    };
  }

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
        className={cn("filtered-items-page-l1", {
          mobile: isMobile
        })}
        style={{
          ...style
        }}
        {...others}
      >
        {!isMobile && (
          <>
            <PageTopPromotion
              {...ITEM_SEARCH_PAGE_TOP_PROMOTION_PROPS}
              itemHrefCreator={item =>
                `/${getItemHref(item, filterTypes, filterValue)}`
              }
            />{" "}
            <div className="plcaholder"> & nbsp; </div>{" "}
          </>
        )}{" "}
        <div className="page-body">
          {" "}
          {!isMobile && <OrderOptionsBar itemBreakpoints={breakpoints} />}{" "}
          <Grid className="page-content" container justify="center">
            <Grid container item {...breakpoints}>
              <FilteredItems
                component={GridList}
                childComponent={FoodCard}
                mapItemData={mapItemData}
                filterTypes={[filterTypes]}
                filterValue={filterValue}
                className="horizontal-list"
                linkTarget="/"
                freeScroll={isMobile}
                frameSize={HORIZONTAL_LIST_FRAME_SIZE}
                skeleton={isSkeleton}
                listProps={{
                  listContainerProps: {
                    className: "list-container"
                  }
                }}
              />{" "}
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

const getItemHref = (item, filterTypes, filterValue) => {
  return `${ITEM_SEARCH_PAGE_URL({
    filterTypes: [filterTypes],
    filterValue
  })}?${ITEM_INSTRUCTIONS_URL_PARAMS({
    id: item.id,
    cuisine: item.cuisine,
    course: item.course,
    meal: item.meal
  })}`;
};

const createFilterLinks = item => {
  const out = {};
  out.sub = `/${ITEM_SEARCH_PAGE_URL({
    filterTypes: ["menuTitle"],
    filterValue: item.subTitle
  })}`;
  out.cat = item.categories.map(
    category =>
      `/${ITEM_SEARCH_PAGE_URL({
        filterTypes: [category.searchType],
        filterValue: category.text
      })}`,
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
