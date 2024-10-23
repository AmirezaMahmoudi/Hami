const Loading = () => {
    return (
        <div className="h-full flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
 preserveAspectRatio="xMidYMid" width="217" height="217" 
 style={{"shape-rendering": "auto" ,"display": "block", "background": "rgb(65, 79, 99)"}} 
 xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle stroke-width="1" stroke="#ffffff" fill="none" r="0" cy="50" cx="50">
  <animate begin="0s" calcMode="spline" keySplines="0 0.2 0.8 1" keyTimes="0;1" values="0;40" dur="1.1764705882352942s" repeatCount="indefinite" attributeName="r"></animate>
  <animate begin="0s" calcMode="spline" keySplines="0.2 0 0.8 1" keyTimes="0;1" values="1;0" dur="1.1764705882352942s" repeatCount="indefinite" attributeName="opacity"></animate>
</circle><circle stroke-width="1" stroke="#e7e9eb" fill="none" r="0" cy="50" cx="50">
  <animate begin="-0.5882352941176471s" calcMode="spline" keySplines="0 0.2 0.8 1" keyTimes="0;1" values="0;40" dur="1.1764705882352942s" repeatCount="indefinite" attributeName="r"></animate>
  <animate begin="-0.5882352941176471s" calcMode="spline" keySplines="0.2 0 0.8 1" keyTimes="0;1" values="1;0" dur="1.1764705882352942s" repeatCount="indefinite" attributeName="opacity"></animate>
</circle><g></g></g></svg>
        </div>
    );
}

export default Loading;