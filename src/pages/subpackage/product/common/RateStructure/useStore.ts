import {useLocalObservable} from "mobx-react"
import {runInAction} from "mobx"
import {QueryProductRateResponse} from "@/types/responses/product/queryProductRate";
import {QueryProductRateRequest} from "@/types/requests/product/queryProductRate";
import api from "@/api/index"

export interface MobxStoreType {
  queryProductRate: (requestData: QueryProductRateRequest) => QueryProductRateResponse;
  productRate: QueryProductRateResponse["productRate"];
  purchaseRateList: QueryProductRateResponse["purchaseRateList"];
  subscribeRateList: QueryProductRateResponse["subscribeRateList"];
  redeemRateList: QueryProductRateResponse["redeemRateList"];
  trusteeRatio: QueryProductRateResponse["trusteeRatio"];
  manageRatio: QueryProductRateResponse["manageRatio"];
  saleServiceRate: QueryProductRateResponse["saleServiceRate"];
}

type UseMobxStoreType = () => MobxStoreType;


const useMobxStore: UseMobxStoreType = () => {
  const store = useLocalObservable<MobxStoreType>(() => {
    return {
      productRate: {},
      purchaseRateList: [],
      subscribeRateList: [],
      redeemRateList: [],
      trusteeRatio: null,
      manageRatio: null,
      saleServiceRate: null,
      async queryProductRate(params) {
        try {
          const response = await  api.product.queryProductRate(params);
          const placeholder = "--";
          const saleServiceRate = response?.data.saleServiceRate;
          runInAction(() => {
            store.productRate = response?.data;
            store.purchaseRateList = response?.data.purchaseRateList;
            store.subscribeRateList = response?.data.subscribeRateList;
            store.redeemRateList = response?.data.redeemRateList;
            store.trusteeRatio = response?.data.trusteeRatio;
            store.manageRatio = response?.data.manageRatio;
            store.saleServiceRate =
              saleServiceRate && saleServiceRate !== placeholder ? saleServiceRate : null;
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  });
  return store;
};

export default useMobxStore;
