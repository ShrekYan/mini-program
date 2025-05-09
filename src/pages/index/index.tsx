import {Text, View} from "@tarojs/components"
import {useLoad} from "@tarojs/taro"
import {Button} from "@nutui/nutui-react-taro"
import "./index.scss"

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  })

  return (
    <View className="index">
      <Button type="primary">123</Button>
      <Text>Hello world!</Text>
    </View>
  )
}
