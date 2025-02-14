import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { InjectedIntlProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import Skeleton from 'react-loading-skeleton'
import { useCssHandles } from 'vtex.css-handles'

import { megaMenuState } from '../State'
import styles from '../styles.css'
import Item from './Item'
import Submenu from './Submenu'
import { BUTTON_ID } from './TriggerButton'

const CSS_HANDLES = [
  'menuContainer',
  'menuContainerNav',
  'menuItem',
  'submenuContainer',
] as const

const HorizontalMenu: FC<
  InjectedIntlProps & {
    openOnly: string
    orientation: string
  }
> = observer((props) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const {
    departments,
    departmentActive,
    config: { defaultDepartmentActive },
    setDepartmentActive,
    openMenu,
  } = megaMenuState

  const { openOnly, orientation } = props
  const [showSubcategories, setShowSubcategories]=useState(true);
  const departmentActiveHasCategories = !!departmentActive?.menu?.length
  const navRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const isTriggerButton = event?.path?.find(
        (data: HTMLElement) => data.dataset?.id === BUTTON_ID
      )

      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !isTriggerButton
      ) {
        openMenu(false)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [openMenu]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const defaultDepartment = departments.find(
      (x) =>
        x.name.toLowerCase().trim() ===
        defaultDepartmentActive?.toLowerCase().trim()
    )

    if (defaultDepartment) {
      setDepartmentActive(defaultDepartment)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDepartmentActive])

  const departmentItems = useMemo(
    () =>
      departments
        .filter((j) => j.display)
        .map((d) => {
          const hasCategories = !!d.menu?.length

          return (
            <li
              className={classNames(
                handles.menuItem,
                d.id === departmentActive?.id && 'bg-black-05'
              )}
              key={d.id}
              onMouseEnter={() => {
                setDepartmentActive(d)
              }}
            >
              <Item
                id={d.id}
                to={d.slug}
                accordion={hasCategories}
                className={classNames('pv3 mh5')}
                style={d.styles}
                enableStyle={d.enableSty}
                closeMenu={openMenu}
              >
                {d.name}
              </Item>
            </li>
          )
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [departments, departmentActive]
  )

  // const loaderBlocks = useMemo(() => {
  //   const blocks: JSX.Element[] = []

  //   for (let index = 1; index <= 4; index++) {
  //     blocks.push(
  //       <div className="lh-copy">
  //         <Skeleton height={20} />
  //         <Skeleton height={80} />
  //       </div>
  //     )
  //   }

  //   return blocks
  // }, [])
  
  return openOnly === orientation ? (
    <nav
      className={classNames(
        handles.menuContainerNav,
        'left-0 bg-white bw1 bb b--muted-3 flex'
      )}
      ref={navRef}
      onMouseLeave={()=>{setShowSubcategories(false)}}
      onMouseEnter={()=>{setShowSubcategories(true)}}
    >
      <ul
        className={classNames(
          styles.menuContainer,
          'list ma0 pa0 pb3 br b--muted-4'
        )}
      >
        {departments.length ? (
          departmentItems
        ) : (
          <div className="flex flex-column justify-center ph5 lh-copy">
            <Skeleton count={3} height={30} />
          </div>
        )}
      </ul>
      {
        showSubcategories?
          departments.length ? (
            departmentActive &&
            departmentActiveHasCategories && (
              <div className={classNames(styles.submenuContainer, 'pa5 w-100','absolute')}>
                <Submenu closeMenu={openMenu ?? 'horizontal'} openOnly={openOnly} />
              </div>
            )
          ) : null
        :null
      }
      
    </nav>
  ) : null
})

export default injectIntl(HorizontalMenu)
