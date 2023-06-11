import { SongItems } from '@/components/SongLists/SongItems'

export const MaintenanceChannelsShow: React.FC = () => {
  return (
    <div className="">
      <h1 className="sub">歌情報を修正</h1>
      <div className="row">
        <SongItems isLink={false} />
      </div>
    </div>
  )
}
