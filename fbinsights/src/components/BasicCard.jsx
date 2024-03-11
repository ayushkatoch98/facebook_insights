export function BasicCard(props){

    return (
        <>
            <div className={` rounded border  border-gray-500  flex `}>
                <div className="  p-4 flex flex-col justify-between leading-normal">
                    <div className="">
                        <div className={`font-bold text-xl mb-2`}>{props.title}</div>
                        <p className=" text-base"> {props.content} </p>
                    </div>
                </div>
            </div>
        </>
    )

}