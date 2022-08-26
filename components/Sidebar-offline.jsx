import Link from "next/link";

const SidebarOffine = ({ data }) => {

    return (
        <Link href={{pathname: '/profile', query:{name: (data.display_name), id:(data.id), state:(true)}}}>
            <div className="flex flex-row py-2 px-4 hover:bg-slate-900 hover:opacity-80 cursor-pointer">
                <img className="grayscale rounded-full h-8" src={data.profile_image_url} alt="" />
                <h4 className="pl-5 truncate text-xs">{data.display_name}</h4>
                <span className="text-right text-xs">Offline</span>
            </div>
        </Link>
    )
}

export default SidebarOffine;