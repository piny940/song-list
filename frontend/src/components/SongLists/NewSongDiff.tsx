import { SongItemType } from '@/resources/types'
import { fetchApi } from '@/utils/api'
import { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export type NewSongDiffProps = {
  songItem: SongItemType
  onSubmit?: (response: Response) => void
}

export const NewSongDiff: React.FC<NewSongDiffProps> = ({
  songItem,
  onSubmit = () => undefined,
}) => {
  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      time: songItem.time.slice(11, 19),
      title: songItem.title,
      author: songItem.author,
    },
  })

  useEffect(() => {
    setValue('time', songItem.time.slice(11, 19))
    setValue('title', songItem.title)
    setValue('author', songItem.author)
  }, [songItem])

  const submit: SubmitHandler<FieldValues> = async (data) => {
    const response = await fetchApi({
      url: `/member/song_items/${songItem.id}/song_diffs`,
      method: 'POST',
      data: {
        song_diff: data,
      },
    })
    onSubmit(response)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label className="row my-1">
        <div className="col-3 fw-bold col-form-label">時間</div>
        <div className="col-9">
          <input
            type="time"
            {...register('time')}
            step={1}
            className="form-control"
            value={watch().time}
            onChange={(e) => setValue('time', e.target.value)}
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
            value={watch().title}
            onChange={(e) => setValue('title', e.target.value)}
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
            value={watch().author}
            onChange={(e) => setValue('author', e.target.value)}
          />
        </div>
      </label>
      <div className="row mt-2 mb-1 px-3">
        <button type="submit" className="btn btn-primary w-100 d-inline-box">
          送信
        </button>
      </div>
    </form>
  )
}
