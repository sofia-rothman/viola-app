import { rewards } from "../../data/rewards"
import ShopItem from "./ShopItem/ShopItem"

const ShopPage = () => {
  return (
    <div>
      {rewards.map((item) => (
        <ShopItem key={item.id} title={item.title} price={item.price} />
      ))}
    </div>
  )
}

export default ShopPage
