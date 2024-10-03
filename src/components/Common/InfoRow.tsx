interface InfoRowProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const InfoRow = ({ label, value, icon }: InfoRowProps) => (
  <div className="py-4 border-b border-gray-300 flex items-center justify-between">
    <p className="text-sm text-gray-700 leading-4 ml-3">{label}</p>
    <div className="flex items-center justify-center">
      {icon && <span className="mr-2">{icon}</span>}
      <p className="text-base leading-none mr-3">{value}</p>
    </div>
  </div>
);

export default InfoRow;
