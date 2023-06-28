import { useState } from 'react'
import styles from '@/styles/song-lists.module.scss'
import { styled } from 'styled-components'
import { TestID } from '@/resources/TestID'
import { DateField } from '../Common/DateField'

const DetailButton = styled.a`
  --text-color: var(--bs-body-color);
  &:hover {
    --text-color: var(--bs-link-color);
  }
`

const Triangle = styled.div`
  border-left: 10px solid var(--text-color);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
`

export type VideosSearchProps = {
  query: string
  setQuery: (query: string) => void
  since: Date | null
  setSince: (since: Date | null) => void
  until: Date | null
  setUntil: (until: Date | null) => void
  onlySongLives: boolean
  setOnlySongLives: (onlySongLives: boolean) => void
}

export const VideosSearch: React.FC<VideosSearchProps> = ({
  query,
  setQuery,
  since,
  setSince,
  until,
  setUntil,
  onlySongLives,
  setOnlySongLives,
}) => {
  const [detailOpened, setDetailOpened] = useState(false)

  const toggleOpened = () => setDetailOpened(!detailOpened)

  return (
    <div className="song-search mb-3" data-testid={TestID.VIDEOS_SEARCH}>
      <div className="d-flex justify-content-between">
        <label className="ms-4 me-2 form-check">
          <input
            type="checkbox"
            name="only-song-lives"
            className="form-check-input"
            checked={onlySongLives}
            onChange={(e) => setOnlySongLives(e.target.checked)}
          />
          <div className="form-check-label">歌枠のみ表示</div>
        </label>
        <DetailButton
          role="button"
          className="small ms-2 me-4"
          onClick={toggleOpened}
          data-testid={TestID.VIDEO_SEARCH_DETAIL_BUTTON}
        >
          <Triangle
            className={`${styles.animateFast} ${
              detailOpened ? styles.rotate90 : ''
            } d-inline-block`}
          ></Triangle>
          <span className="ms-1">詳細検索</span>
        </DetailButton>
      </div>
      <div className="detail-search my-2 px-4">
        <div
          className={`${styles.collapsableFast} ${
            detailOpened ? `${styles.active} border border-light rounded` : ''
          }`}
        >
          {detailOpened && (
            <div className="mx-2" id="song-detail-search">
              <label className="row my-1">
                <div className="col-3 fw-bold col-form-label">開始日</div>
                <div className="col-9">
                  <DateField value={since} setValue={setSince} />
                </div>
              </label>
              <label className="row my-1">
                <div className="col-3 fw-bold col-form-label">終了日</div>
                <div className="col-9">
                  <DateField value={until} setValue={setUntil} />
                </div>
              </label>
              <label className="row my-1">
                <div className="col-3 fw-bold col-form-label">枠名</div>
                <div className="col-9">
                  <input
                    type="text"
                    name="videoTitle"
                    className="form-control"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
