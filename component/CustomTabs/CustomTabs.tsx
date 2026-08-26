'use client'

import {
  TabList,
  TabContext,
  TabPanel,
  type TabPanelProps,
  type TabListProps,
} from '@mui/lab'
import { Tab, type TabProps } from '@mui/material'
import { useState } from 'react'

type CustomTabsProps = {
  tabs: {
    label: TabProps['label']
    panel: TabPanelProps['children']
  }[]
  slotProps?: {
    tabList?: Partial<TabListProps>
    tabPanel?: Partial<TabPanelProps>
  }
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, slotProps }) => {
  const [tab, setTab] = useState('0')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  return (
    <TabContext value={tab}>
      <TabList onChange={handleChange} {...slotProps?.tabList}>
        {tabs.map((tabItem, index) => (
          <Tab key={index} label={tabItem.label} value={index.toString()} />
        ))}
      </TabList>
      {tabs.map((tabItem, index) => (
        <TabPanel key={index} value={index.toString()} {...slotProps?.tabPanel}>
          {tabItem.panel}
        </TabPanel>
      ))}
    </TabContext>
  )
}

export default CustomTabs
