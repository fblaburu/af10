import React from 'react';

const html = () => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: '<style>.lf10-mega-menu-3-x-submenuContainer {top: 160px;}</style>' }} />
        </div>
    );
};

export default html;