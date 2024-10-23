const PageTitle = ({title}) => {
    return (
        <div className="inline-block">
            <h1 className="text-2xl mb-3">{title}</h1>
            <hr className="border-[#167DE5] border-1 w-[120%] opacity-100"/>
        </div>
    );
}

export default PageTitle;