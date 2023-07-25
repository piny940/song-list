import { useTheme } from '@/context/ThemeProvider'
import HeadBase from 'next/head'

export const Head: React.FC = () => {
  const { theme } = useTheme()

  return (
    <HeadBase>
      <title>歌枠データベース Vtuberが歌った歌を検索</title>
      <meta
        name="theme-color"
        content={theme === 'dark' ? '#212529' : '#f8f9fa'}
      />
      <meta
        content="Vtuberの歌枠で歌われた曲を簡単に検索できるサイトです。豊富な歌唱コンテンツからお気に入りの楽曲を見つけましょう。高度な検索機能と使いやすいインターフェースで、あなたのお気に入りのVtuberの歌をすばやく見つけることができます。楽曲タイトル、アーティスト名など、様々な条件で絞り込んで探せます。是非、Vtuberの素晴らしい歌声をお楽しみください！"
        name="description"
      ></meta>

      <meta
        content="歌枠, データベース, SongList, vtuber, Vtuber, 凪乃ましろ"
        name="keywords"
      />
      <meta name="twitter:site" content="@songlist940" />
      <meta name="og:site_name" content="歌枠データベース SongList" />
      <meta name="og:url" content="https://song-list.piny940.com" />
      <meta name="og:title" content="歌枠データベース Vtuberが歌った歌を検索" />
      <meta
        name="og:description"
        content="Vtuberの歌枠で歌われた曲を簡単に検索できるサイトです。豊富な歌唱コンテンツからお気に入りの楽曲を見つけましょう。高度な検索機能と使いやすいインターフェースで、あなたのお気に入りのVtuberの歌をすばやく見つけることができます。楽曲タイトル、アーティスト名など、様々な条件で絞り込んで探せます。是非、Vtuberの素晴らしい歌声をお楽しみください！"
      />
      <meta
        name="og:image"
        content="https://i.gyazo.com/c8e2b19407a1d46e3cf0441b3748ee57.png"
      />
      <meta
        name="twitter:image"
        content="https://i.gyazo.com/af8cc7069a6fa8f6473b23f84a79bfa0.png"
      />
      <meta name="apple-mobile-web-app-title" content="歌枠データベース" />
      <meta name="twitter:card" content="summary" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="google-site-verification"
        content="wh6YJ0kFTO_rXOkxX0C9lQqBndl_09ZG0MrkgTWcQIY"
      />
    </HeadBase>
  )
}
