import { useAlerts } from '@/context/AlertsProvider'
import { useSongDiffs } from '@/hooks/songDiff'
import { useSongItems } from '@/hooks/songItem'
import { AlertState } from '@/resources/enums'
import { SongItemType } from '@/resources/types'
import { fetchApi } from '@/utils/api'
import { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export type NewSongDiffProps = {
  songItem: SongItemType
}

export const NewSongDiff: React.FC<NewSongDiffProps> = ({ songItem }) => {
  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      time: songItem.time,
      title: songItem.title,
      author: songItem.author,
    },
  })
  const { mutateAll } = useSongItems({}, { isPaused: () => true })
  const { mutate } = useSongDiffs({ songItemId: songItem.id })
  const { addAlert } = useAlerts()

  useEffect(() => {
    setValue('time', songItem.time)
    setValue('title', songItem.title)
    setValue('author', songItem.author)
  }, [songItem, setValue])

  const submit: SubmitHandler<FieldValues> = async (data) => {
    if (
      songItem.time === data.time
      && songItem.title === data.title
      && songItem.author === data.author
    )
      return

    await fetchApi({
      url: `/member/song_items/${songItem.id}/song_diffs`,
      method: 'POST',
      data: {
        song_diff: data,
      },
    })
    void mutateAll()
    void mutate()
    addAlert({
      state: AlertState.NOTICE,
      content: '歌情報を更新しました。',
    })
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
            onChange={e => setValue('time', e.target.value)}
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
            onChange={e => setValue('title', e.target.value)}
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
            onChange={e => setValue('author', e.target.value)}
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
