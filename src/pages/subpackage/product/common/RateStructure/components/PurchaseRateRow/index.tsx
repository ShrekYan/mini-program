import React from "react";
import type { QueryProductRateResponse } from "@/types/responses/product/queryProductRate.ts";
import {View,Text} from "@tarojs/components"
import { FeeTypeEm } from "./../../constant";

const numberHandle = function (value: number) {
    return value / 10000;
};

const PurchaseRateRow: React.FC<{
    item: QueryProductRateResponse["subscribeRateList"][0];
}> = (props) => {
    const rateItemInfo = props.item;
    return (
      <View className="row">
        <View className="item">
          {rateItemInfo.to ? (
            <View>
              {rateItemInfo.from ? (
                <Text>{numberHandle(rateItemInfo.from)}万≤</Text>
              ) : null}
              <Text>M</Text>
              <Text>&lt;{numberHandle(rateItemInfo.to)}万</Text>
            </View>
          ) : (
            <View>
              <Text>M≥</Text>
              {rateItemInfo.from ? (
                <Text>{numberHandle(rateItemInfo.from)}万</Text>
              ) : (
                <Text>0</Text>
              )}
            </View>
          )}
        </View>
        <View className="item">
          {rateItemInfo.feeType === FeeTypeEm.percent && <Text>{rateItemInfo.fee}%</Text>}
          {rateItemInfo.feeType === FeeTypeEm.each && <Text>单笔{rateItemInfo.fee}</Text>}
        </View>
      </View>
    );
};

export default PurchaseRateRow;
