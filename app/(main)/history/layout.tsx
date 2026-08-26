import RecordDataLayer from '@/component/Record/RecordDataLayer'

const HistoryLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <RecordDataLayer />
    {children}
  </>
)

export default HistoryLayout
