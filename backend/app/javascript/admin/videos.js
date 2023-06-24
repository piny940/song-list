const onlySongLivesCheckbox = () => document.querySelector('#only-song-lives')
const onlyIncompletedCheckbox = () => document.querySelector('#only-incompleted')

const updateSearchParams = () => {
  const channelIdMatch = window.location.search.match(/channel_id=[0-9]+/)
  const channelId = channelIdMatch && channelIdMatch[0].split('=')[1]
  const onlySongLives = onlySongLivesCheckbox().checked ? '1' : '0'
  const onlyIncompleted = onlyIncompletedCheckbox().checked ? '1' : '0'
  window.location.search = `?channel_id=${channelId}&only_song_lives=${onlySongLives}&only_incompleted=${onlyIncompleted}`
}

document.addEventListener('DOMContentLoaded', () => {
  onlySongLivesCheckbox().addEventListener('change', (e) => {
    updateSearchParams()
  })
  onlyIncompletedCheckbox().addEventListener('change', (e) => {
    updateSearchParams()
  })
})
