import { SongItemType } from '@/resources/types'
import { useEffect, useState } from 'react'

export type NewSongDiffProps = {
  songItem: SongItemType
}

export const NewSongDiff: React.FC<NewSongDiffProps> = ({ songItem }) => {
  const [time, setTime] = useState(songItem.time)
  const [title, setTitle] = useState(songItem.title)
  const [author, setAuthor] = useState(songItem.author)

  useEffect(() => {
    setTime(songItem.time)
    setTitle(songItem.title)
    setAuthor(songItem.author)
  }, [songItem])

  return (
    <form>
      <label className="row my-1">
        <div className="col-3 fw-bold col-form-label">時間</div>
        <div className="col-9">
          <input
            type="date"
            name="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </label>
      <label className="row my-1">
        <div className="col-3 fw-bold col-form-label">タイトル</div>
        <div className="col-9">
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </label>
      <label className="row my-1">
        <div className="col-3 fw-bold col-form-label">歌手</div>
        <div className="col-9">
          <input
            type="text"
            name="author"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </label>
    </form>
  )
}
