import {useEffect} from "react"
import {useRouter} from "@tarojs/taro"
import {QueryProductRateResponse} from "@/types/responses/product/queryProductRate";
import classnames from "classnames"
import {View} from "@tarojs/components"
import {Observer} from "mobx-react"
import useStore from "./useStore"
import styles from "./index.module.scss";
import PurchaseRateRow from "./components/PurchaseRateRow/index"

const Index = () => {
  const store = useStore();
  const router = useRouter();
  useEffect(() => {
    const {productId} = router?.params;
    store.queryProductRate({
      productId: productId as string
    });
  }, []);

  return (
    <Observer>
      {
        () => {
          const {
            purchaseRateList,
            subscribeRateList,
            //redeemRateList,
            trusteeRatio,
            manageRatio,
            saleServiceRate
          } = store;
          return (
            <View className={styles.rateStructureContainer}>
              {saleServiceRate && (
                <View className={styles.saleServeRate}>
                  <View className={styles.title}>销售服务费率</View>
                  <View className={styles.desc}>本基金不收取认购/申购费用</View>
                  <View className={styles.subDesc}>
                    <View className={styles.leftArea}>销售服务费</View>
                    <View className={styles.rightArea}>
                      按前一日基金资产净值的{saleServiceRate}%年费率计提。
                    </View>
                  </View>
                </View>
              )}
              {/*基金申购费率*/}
              {!(saleServiceRate > 0) && (
                <View className={classnames(styles.fundOperationRate, styles.tableBlock)}>
                  <View className={styles.title}>基金申购费率</View>
                  <View className={styles.table}>
                    <View className={styles.tableHead}>
                      <View className={styles.row}>
                        <View className={styles.item}>单笔金额（M）</View>
                        <View className={styles.item}>收费标准</View>
                      </View>
                    </View>
                    <View className={styles.tableContent}>
                      {purchaseRateList.map(
                        (
                          item: QueryProductRateResponse["subscribeRateList"][0],
                          index: number
                        ) => {
                          return <PurchaseRateRow item={item} key={index} />;
                        }
                      )}
                    </View>
                  </View>
                </View>
              )}
              {/*基金运作费*/}
              <View className={styles.fundOperationRate}>
                <View className={styles.title}>基金运作费</View>
                <View className={styles.descContainer}>
                  <View className={styles.descItem}>
                    <View className={styles.leftArea}>管理费率</View>
                    <View className={styles.rightArea}>
                      本基金的管理费按前一日基金资产净值的{manageRatio}%年费率计提。
                    </View>
                  </View>
                  <View className={styles.descItem}>
                    <View className={styles.leftArea}>托管费率</View>
                    <View className={styles.rightArea}>
                      按前一日基金资产净值的{trusteeRatio}%的年费率计提。
                    </View>
                  </View>
                </View>
              </View>
              {/*基金认购费率*/}
              {subscribeRateList.length > 0 && (
                <View className={classnames(styles.fundOperationRate, styles.tableBlock)}>
                  <View className={styles.title}>基金认购费率</View>
                  <View className={styles.table}>
                    <View className={styles.tableHead}>
                      <View className={styles.row}>
                        <View className={styles.item}>单笔金额（M）</View>
                        <View className={styles.item}>收费标准</View>
                      </View>
                    </View>
                    <View className={styles.tableContent}>
                      {subscribeRateList.map(
                        (
                          item: QueryProductRateResponse["subscribeRateList"][0],
                          index: number
                        ) => {
                          return <PurchaseRateRow item={item} key={index} />;
                        }
                      )}
                    </View>
                  </View>
                </View>
              )}
            </View>
          )
        }
      }
    </Observer>
  )
}

export default Index;
