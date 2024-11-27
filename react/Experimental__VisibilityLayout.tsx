import React, { Fragment } from 'react'

const Experimental__VisibilityLayout: StorefrontFunctionComponent<VisibilityLayoutProps> = ({
  visible = true,
  children
}) => {
  if (visible === false) {
    return null
  }

  return <Fragment>{children}</Fragment>
}

interface VisibilityLayoutProps {
  visible: boolean
}

Experimental__VisibilityLayout.schema = {
  title: 'Hide component'
}

export default Experimental__VisibilityLayout
