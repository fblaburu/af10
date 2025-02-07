import React from 'react';

const html = (format: any) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: format }} />
        </div>
    );
};


html.defaultProps = {
    format: '<style>.lf10-mega-menu-3-x-submenuContainer {top: 140px;}</style>'
};

html.schema = {
    title: 'Style',
    type: 'object',
    properties: {
        format: {
            title: 'Estilo',
            description: '<style>.lf10-mega-menu-3-x-submenuContainer {top: 140px;}</style>',
            type: 'string'
        }
    },
}

export default html;