
// import Top from './components/Top'
import Main from './components/Main'
import Top from './containers/Top'
import Audio from './containers/Audio'

//全局样式
import './App.css'
const App = () => {
  return (
    <div className="App">
      <Top />
      <Main />
      <Audio />
      {/*<Link to="discover">发现音乐</Link>
      <Link to="recommend">推荐歌单</Link>
      <Link to="songs">最新音乐</Link>
      <Link to="mv">最新Mv</Link> */}
    </div>
  )
}

export default App
