const EmptyPokeballIcon = () => (
    <svg className="w-20 h-20 text-gray-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10"/>
        <path d="M8 32H56" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10"/>
        <path d="M32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10"/>
    </svg>
);

const EmptyState = ({ title, msg }: { title: string; msg: string; }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <EmptyPokeballIcon />
      <h2 className="mt-6 text-2xl font-bold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-500 max-w-sm">{msg}</p>
    </div>
  );
};

export default EmptyState;