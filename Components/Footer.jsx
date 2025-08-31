import Image from "next/image"
import Recat from "react"
import {assets} from "../Assets/assets"
const Footer=()=>{
return(
    <div className="flex  justify-around gap-2 sm:gap-0 sm-flex-row bg-black py-5">
<Image src={assets.logo_light} alt="" width={120}/>
<p className="text-sm text-white">All eight reserved. Copyright @blog</p>
<div className="flex">
    <Image src={assets.facebook_icon} alt="" width={40} />
    <Image src={assets.twitter_icon} alt="" width={40} />
    <Image src={assets.googleplus_icon} alt="" width={40} />
</div>
    </div>
)
}
export default Footer