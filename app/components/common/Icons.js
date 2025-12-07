export function CheckIcon({ fill = "currentColor" }) {
  return (
    <svg 
      viewBox="0 0 512 512"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", opacity: 1, pointerEvents: "none" }}
    >
      <g>
        <polygon
          className="st0"
          points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587 289.878,367.055 512,144.945"
          style={{ fill: fill }}
        />
      </g>
    </svg>
  );
}

export function CrossIcon({ fill = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", maxWidth: "100%", height: "100%", opacity: 1, pointerEvents: "none" }}
    >
      <g>
        <polygon
          className="st0"
          points="512,52.535 459.467,0.002 256.002,203.462 52.538,0.002 0,52.535 203.47,256.005 0,459.465 52.533,511.998 256.002,308.527 459.467,511.998 512,459.475 308.536,256.005 "
          style={{ fill: fill }}
        ></polygon>
      </g>
    </svg>
  );
}

export function ROCIcon({ roc = "increase" }) {
  return(
    <>
      {roc === "increase" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M16 7h6v6"></path>
          <path d="m22 7-8.5 8.5-5-5L2 17"></path>
        </svg>
      )}
      {roc === "decrease" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M16 17h6v-6"></path>
          <path d="m22 17-8.5-8.5-5 5L2 7"></path>
        </svg>
      )}
    </>
  );
}

export function SearchIcon({ fill = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", maxWidth: "100%", height: "100%", opacity: 1 }}
    >
      <g>
        <path
          d="M495.272,423.558c0,0-68.542-59.952-84.937-76.328c-24.063-23.938-33.69-35.466-25.195-54.931 c37.155-75.78,24.303-169.854-38.72-232.858c-79.235-79.254-207.739-79.254-286.984,0c-79.245,79.264-79.245,207.729,0,287.003 c62.985,62.985,157.088,75.837,232.839,38.691c19.466-8.485,31.022,1.142,54.951,25.215c16.384,16.385,76.308,84.937,76.308,84.937 c31.089,31.071,55.009,11.95,69.368-2.39C507.232,478.547,526.362,454.638,495.272,423.558z M286.017,286.012 c-45.9,45.871-120.288,45.871-166.169,0c-45.88-45.871-45.88-120.278,0-166.149c45.881-45.871,120.269-45.871,166.169,0 C331.898,165.734,331.898,240.141,286.017,286.012z"
          style={{ fill: fill }}
        ></path>
      </g>
    </svg>
  );
}
