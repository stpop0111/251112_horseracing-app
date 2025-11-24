export default function PageWrapper ({children}) {
  return (
    <div className="flex justify-center items-center">
      {children}
    </div>
  );
}