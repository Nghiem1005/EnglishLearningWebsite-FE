import React from 'react';

const Header = ({ category = '', title  }) => (
  <div className=" mb-6">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

export default Header;
