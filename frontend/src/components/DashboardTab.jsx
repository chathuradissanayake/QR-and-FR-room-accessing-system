import React from 'react'
import { Link } from 'react-router-dom'

const DashboardTab = ({ title, description, href, image }) => {
    return (
      <Link to={href} className="block bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          <img src={image} alt={title} className="w-10 h-10" />
        </div>
      </Link>
    );
  };

export default DashboardTab