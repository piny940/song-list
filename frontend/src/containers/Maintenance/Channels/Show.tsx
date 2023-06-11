import { SongItems } from '@/components/SongLists/SongItems'

export const MaintenanceChannelsShow: React.FC = () => {
  return (
    <div className="">
      <h1 className="sub">チャンネル一覧</h1>
      <div className="row">
        <SongItems isLink={false} />
      </div>
    </div>
  )
}
