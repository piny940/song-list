import { useState } from 'react'
import styles from '../../styles/song-lists.module.scss'
import { styled } from 'styled-components'

const DetailButton = styled.a`
  --text-color: black;
  &:hover {
    --text-color: #0d6efd;
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
  since: string
  setSince: (since: string) => void
  until: string
  setUntil: (until: string) => void
}

export const VideosSearch: React.FC<VideosSearchProps> = ({
  query,
  setQuery,
  since,
  setSince,
  until,
  setUntil,
}) => {
  const [detailOpened, setDetailOpened] = useState(false)

  const toggleOpened = () => setDetailOpened(!detailOpened)

  return (
    <div className="song-search mb-3">
      <div className="d-flex justify-content-end">
        <DetailButton
          role="button"
          className="small me-4"
          onClick={toggleOpened}
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
                  <input
                    type="date"
                    name="since"
                    className="form-control"
                    value={since}
                    onChange={(e) => setSince(e.target.value)}
                  />
                </div>
              </label>
              <label className="row my-1">
                <div className="col-3 fw-bold col-form-label">終了日</div>
                <div className="col-9">
                  <input
                    type="date"
                    name="until"
                    className="form-control"
                    value={until}
                    onChange={(e) => setUntil(e.target.value)}
                  />
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
