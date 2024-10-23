const CircleLoading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="30"
      height="30"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="inline-block animate-spin"
    >
      <g>
        <circle
          stroke-dasharray="164.93361431346415 56.97787143782138"
          r="35"
          stroke-width="10"
          stroke="#fff"
          fill="none"
          cy="50"
          cx="50"
          transform="matrix(1,0,0,1,0,0)"
        ></circle>
        <g></g>
      </g>
    </svg>
  );
};

export default CircleLoading;
