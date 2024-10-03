interface InfoRowProps {
  label: string;
  value: string | number;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="py-4 border-b border-gray-300 flex items-center justify-between">
    <p className="text-sm text-gray-700 leading-4 ml-3">{label}</p>
    <div className="flex items-center justify-center">
      <p className="text-base leading-none mr-3">{value}</p>
    </div>
  </div>
);

export default InfoRow;
