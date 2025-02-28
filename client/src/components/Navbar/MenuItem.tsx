import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface MenuItemsProps {
  onClick: () => void;
  label: string;
  style?: string;
  icons:IconType
}

const MenuItem: React.FC<MenuItemsProps> = ({ onClick, label, style,icons:Icon }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className={`mx-3 w-40 flex justify-start items-center gap-2 py-1.5 hover:bg-neutral-200 rounded-md m-1 transition ${style}`}
    >
      <Icon className="text-lg" />
      {label}
    </motion.div>
  );
};

export default MenuItem;
