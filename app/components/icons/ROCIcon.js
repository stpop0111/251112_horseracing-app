export default function ROCIcon({ roc = "increase" }) {
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
