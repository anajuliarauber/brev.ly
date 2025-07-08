interface PageStatusProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export const PageStatus = ({ children, icon, title }: PageStatusProps) => {
  return (
    <div className="min-h-screen w-full bg-gray-200 font-primary flex justify-center items-center">
      <div className="w-full max-w-[580px] h-fit bg-white rounded-xl p-12 shadow flex flex-col justify-center items-center gap-6">
        {icon}
        <h1 className="text-2xl font-bold">{title}</h1>
        <div>{children}</div>
      </div>
    </div>
  );
};
