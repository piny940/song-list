import { useState } from 'react'
import styles from '@/styles/song-lists.module.scss'
import { TestID } from '@/resources/TestID'
import { DateField } from '../Common/DateField'
import { ContentOpener } from '../Common/ContentOpener'

export type SongItemsSearchProps = {
  query: string
  setQuery: (query: string) => void
  since: Date | null
  setSince: (since: Date | null) => void
  until: Date | null
  setUntil: (until: Date | null) => void
  videoTitle: string
  setVideoTitle: (videoTitle: string) => void
}

export const SongItemsSearch: React.FC<SongItemsSearchProps> = ({
  query,
  setQuery,
  since,
  setSince,
  until,
  setUntil,
  videoTitle,
  setVideoTitle,
}) => {
  const [detailOpened, setDetailOpened] = useState(false)

  const toggleOpened = () => setDetailOpened(!detailOpened)

  return (
    <form className="song-search mb-4">
      <div className="d-flex justify-content-end">
        <ContentOpener
          testID={TestID.SONG_ITEMS_SEARCH_DETAIL_BUTTON}
          onClick={toggleOpened}
          contentOpen={detailOpened}
          label="詳細検索"
        />
      </div>
      <div className="row px-4 mt-2 mb-2">
        <div className="fw-bold col-3 col-sm-2 col-form-label">検索</div>
        <div className="col-9 col-sm-10">
          <input
            type="text"
            className="form-control"
            value={query}
            placeholder="曲名/歌手名を入力"
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="detail-search my-2 px-3">
        <div
          className={`px-2 ${styles.collapsableFast} ${
            detailOpened ? `${styles.active} border border-light rounded` : ''
          }`}
        >
          {detailOpened && (
            <div className="mx-3" id="song-detail-search">
              <div className="row my-1">
                <div className="col-4 col-sm-3 fw-bold col-form-label">
                  開始日
                </div>
                <div className="col-8 col-sm-9">
                  <DateField
                    value={since}
                    setValue={setSince}
                    maxDate={new Date()}
                  />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-4 col-sm-3 fw-bold col-form-label">
                  終了日
                </div>
                <div className="col-8 col-sm-9">
                  <DateField
                    value={until}
                    setValue={setUntil}
                    maxDate={new Date()}
                  />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-4 col-sm-3 fw-bold col-form-label">
                  枠名
                </div>
                <div className="col-8 col-sm-9">
                  <input
                    type="text"
                    name="videoTitle"
                    className="form-control"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
