import React, {
  Fragment,
  useState,
  useEffect,
  BaseSyntheticEvent,
} from "react";
import { useHistory } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";

import { useSelector } from "customHooks/useSelector";
import {
  MainContainer,
  Filters,
  FilterElement,
  Button,
  CountOfGoodsContainer,
  StyledTooltip,
  TooltipElement,
  StyledOrderStatusContainer,
  PlusFilterIconContainer,
} from "./styles";
import { ReactComponent as EditIcon } from "assets/adminPanel/edit.svg";
import { ReactComponent as DeleteIcon } from "assets/adminPanel/delete.svg";
import firebase from "utils/firebase";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { useDispatch } from "react-redux";
import { setFilters } from "store/actions";
import { getIdsForFilters, deleteGoods } from "axiosRequests/adminPanel";
import { orderStatus } from "utils/constants";
import EditFiltersPopover from "./editFilterPopover";
import { ReactComponent as PlusIcon } from "assets/adminPanel/plus.svg";
import Spinner from "components/spinner";

interface ICustomerData {
  name: string;
  patronymic: string;
  phone: string;
  city: string;
  warehouse: string;
}

interface IOrderData {
  count: number;
  elementValue: {
    type: string;
    value: string;
  };
  id: string;
}

interface IComplateOrders {
  customerData: ICustomerData;
  date: string;
  id: string;
  ordersData: IOrderData;
}

interface IRelatedOrderData {
  id: string;
  status: "ordered" | "accepted" | "delivered" | "cancelled";
}

interface IRelatedGoodsAndOrders {
  relatedGoods: {
    [key: string]: string[];
  };
  relatedOrders: {
    [key: string]: IRelatedOrderData[];
  };
}

export interface IFilterFormData {
  name: string;
  units: string;
}

const FiltersContainer = () => {
  const [filterFormData, setFilterFormData] = useState<IFilterFormData>({
    name: "",
    units: "",
  });
  const [isFetching, setFetching] = useState(false);
  const [editableFilterId, setEditableFilterId] = useState<string | null>(null);
  const [
    anchorForFilterPopover,
    setAnchorForFilterPopover,
  ] = React.useState<HTMLDivElement | null>(null);
  const filters = useSelector((state) => state.filters);
  const history = useHistory();
  const dispatch = useDispatch();
  const [relatedGoodsAndOrders] = useAsyncMemo<IRelatedGoodsAndOrders>(
    async () => {
      const token = (await firebase.auth().currentUser?.getIdTokenResult())
        ?.token;
      return token
        ? getIdsForFilters(token)
        : new Promise((resolve) => {
            resolve({
              relatedGoods: {},
              relatedOrders: {},
            });
          });
    },
    [filters],
    {
      relatedGoods: {},
      relatedOrders: {},
    }
  );
  const { pending } = relatedGoodsAndOrders;
  const { relatedGoods, relatedOrders } = relatedGoodsAndOrders.data;

  useEffect(() => {
    updateFilterData();
  }, []);

  const setFilterFormDataHandler = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setFilterFormData({
      ...filterFormData,
      [name]: value,
    });
  };

  const updateFilterData = async () => {
    const filters: any = (
      await firebase.firestore().collection("filters").get()
    ).docs.map((elem) => elem.data());

    dispatch(setFilters(filters));
  };

  const deleteFilter = async (id: string) => {
    setFetching(true);
    try {
      const relatedGoodsIds = relatedGoods[id] || [];
      const token =
        (await firebase.auth().currentUser?.getIdTokenResult())?.token || null;

      await deleteGoods(
        {
          goodsIds: relatedGoodsIds,
        },
        token
      );
      await firebase.firestore().collection("filters").doc(id).delete();

      updateFilterData();
    } catch (err) {
      console.log(err, "error");
    }
    setFetching(false);
  };

  const openEditPopoverFilterHandler = (e: BaseSyntheticEvent, id?: string) => {
    setAnchorForFilterPopover(e.currentTarget);

    if (id) {
      setEditableFilterId(id);
      const changedFilter = filters.find((filter) => filter.id === id);

      if (changedFilter) {
        const { name, units } = changedFilter;

        setFilterFormData({
          name,
          units,
        });
      }
    }
  };

  const closePopoverHandler = () => {
    setFilterFormData({
      name: "",
      units: "",
    });
    setAnchorForFilterPopover(null);
    setEditableFilterId(null);
  };

  const submitPopoverHandler = async () => {
    setFetching(true);
    const { name, units } = filterFormData;
    try {
      if (editableFilterId) {
        await firebase
          .firestore()
          .collection("filters")
          .doc(editableFilterId)
          .update({
            name,
            units,
          });
      } else {
        const id = uuidv1();
        await firebase.firestore().collection("filters").doc(id).set({
          id,
          name,
          type: id,
          units,
        });
      }
      closePopoverHandler();
      updateFilterData();
    } catch (err) {
      console.log(err, "error");
    }
    setFetching(false);
  };

  if (isFetching || pending) {
    return <Spinner />;
  }

  return (
    <MainContainer>
      <EditFiltersPopover
        filterFormData={filterFormData}
        setFilterFormData={setFilterFormDataHandler}
        anchorEl={anchorForFilterPopover}
        closeHandler={closePopoverHandler}
        editableFilterId={editableFilterId}
        popoverSubmitHandler={submitPopoverHandler}
      />
      <Filters>
        {filters.map((elem) => {
          const { name, id, type, units } = elem;
          return (
            <FilterElement key={id}>
              {name}{" "}
              <span>
                (
                {units.length > 0
                  ? `Ед. измерения: ${units}`
                  : "Нет единиц измерения"}
                )
              </span>{" "}
              <CountOfGoodsContainer>
                <span>-{(relatedGoods[id] || []).length} товар(ов)</span>
                <StyledTooltip isEmpty={!Boolean(relatedGoods[id])}>
                  {relatedGoods[id] &&
                    relatedGoods[id].map((elem) => {
                      return (
                        <TooltipElement
                          onClick={() =>
                            history.push(`/adminPanel?id=${elem}#3`)
                          }
                        >
                          {elem}
                        </TooltipElement>
                      );
                    })}
                </StyledTooltip>
              </CountOfGoodsContainer>
              <CountOfGoodsContainer>
                <span>-{(relatedOrders[id] || []).length} заказ(ов)</span>
                <StyledTooltip isEmpty={!Boolean(relatedOrders[id])}>
                  {relatedOrders[id] &&
                    relatedOrders[id].map((elem) => {
                      const { id, status } = elem;
                      return (
                        <TooltipElement
                          onClick={() => history.push(`/adminPanel?id=${id}#0`)}
                        >
                          {id}
                          <StyledOrderStatusContainer status={status}>
                            {orderStatus[status]}
                          </StyledOrderStatusContainer>
                        </TooltipElement>
                      );
                    })}
                </StyledTooltip>
              </CountOfGoodsContainer>
              {type !== "price" && type !== "brand" && (
                <Fragment>
                  <Button
                    right={"60px"}
                    onClick={(e) => openEditPopoverFilterHandler(e, id)}
                  >
                    <EditIcon />
                  </Button>
                  <Button right={"20px"} onClick={() => deleteFilter(id)}>
                    <DeleteIcon />
                  </Button>
                </Fragment>
              )}
            </FilterElement>
          );
        })}
      </Filters>
      <PlusFilterIconContainer onClick={(e) => openEditPopoverFilterHandler(e)}>
        <PlusIcon />
      </PlusFilterIconContainer>
    </MainContainer>
  );
};

export default FiltersContainer;
