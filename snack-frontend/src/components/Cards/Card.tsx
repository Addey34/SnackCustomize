import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  price?: number;
  image?: string;
  children?: React.ReactNode;
}

export default function Card({
  title,
  description,
  price,
  image,
  children,
}: CardProps) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded"
        />
      )}
      <h3 className="font-bold text-lg">{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}
      {price && <p className="font-semibold">{price} €</p>}
      {children}
    </div>
  );
}
