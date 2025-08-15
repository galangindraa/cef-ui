import { LucideIcon, LucideProps } from 'lucide-react';

interface LibIconProps extends Omit<LucideProps, 'className'> {
  icon: LucideIcon;
  className?: string;
}

const LibIcon: React.FC<LibIconProps> = ({ icon: Icon, className, ...props }) => {
  return <Icon className={className} {...props} />;
};

export default LibIcon;