import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import styles from 'styled-components'
import { CSSTransition } from 'react-transition-group'


const wallPaperIds = ['ZjZBL8V1nMM','8dMvxXQKZag','fr2--0bD6JU','TPB-0YtXHlY']

const ParallaxBackgroundDiv = styles.div`
  min-height: 100vh;
  background: url(${props=>props.wallPaperIndex});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const RepoDiv = styles.div`
  background: rgba(255,255,255, 0.7);
  display: flex;
  height: 50vh;
  width: 70vw;
  border-radius: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  @media(max-width: 900px) {
    flex-direction: column;
  }
`

const RepoInfoDiv = styles.div`
  width: 35%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 20px;
  box-sizing: border-box;

  div {
    color: green;
    overflow: hidden;
    position: relative;
    transition: left 1000ms, opacity 1000ms;
    transition-delay: 300ms;

    opacity: 0;

    // enter from
    &.fade-enter {
      left: -25px;
      opacity: 0;
    }

    // enter to
    &.fade-enter-active {
      left: 0px;
      opacity: 1;
    }

    &.fade-enter-done {
      left: 0px;
      opacity: 1;
    }
  }
  a {
    text-decoration: none;
  }

  @media(max-width: 900px) {
    width: 90%;
    height: 20%;
    text-align: center;
  }
`

const RepoReadMeDiv = styles.div`
  width: 50%;
  height: 80%;
  padding: 20px;
  border-radius: 15px;
  background: rgba(0,0,0,0.5);
  color: silver;
  overflow: auto;
  box-sizing: border-box;
  opacity: 0;
  position: relative;
  transition: top 1000ms, opacity 1000ms;
  transition-delay: 700ms;

  // enter from
  &.fade-enter {
    top: -25px;
    opacity: 0;
  }

  // enter to
  &.fade-enter-active {
    top: 0px;
    opacity: 1;
  }

  &.fade-enter-done {
    top: 0px;
    opacity: 1;
  }

  @media(max-width: 900px) {
    width: 90%;
  }
`

const AppDiv = styles.div``

const BannerDiv = styles.div`
  min-width: 500px;
  width: 50vw;
  background: rgba(255,255,255,0.7);
  text-align: center;
  border-radius: 20px;
  margin: auto auto;
`

const RepoNameH1 = styles.h1`
  width: 100%;
  background: black;
  color: white;
  text-align: center;
  font-style: italic;
  box-sizing: border-box;
  margin: 0;
  padding: 0.67em 0px;
`

function backgroundSetterClosure(){
  const wallPaperUrls = 
  ['https://images.unsplash.com/photo-1635341376583-51472269f13b?ixid=MnwyNzI5NDh8MHwxfGFsbHx8fHx8fHx8fDE2MzU5NTE0NjM&ixlib=rb-1.2.1',
  'https://images.unsplash.com/photo-1634824419410-8594aa656661?ixid=MnwyNzI5NDh8MHwxfGFsbHx8fHx8fHx8fDE2MzU5NTU1NTQ&ixlib=rb-1.2.1',
  'https://images.unsplash.com/photo-1577268173819-d36a3378f8d8?ixid=MnwyNzI5NDh8MHwxfGFsbHx8fHx8fHx8fDE2MzYwMTE2NzM&ixlib=rb-1.2.1',
  'https://images.unsplash.com/photo-1634746027343-985ad425b8b5?ixid=MnwyNzI5NDh8MHwxfGFsbHx8fHx8fHx8fDE2MzYwMTE3NTI&ixlib=rb-1.2.1',]
  let index = 0
  return function() {
    let url = wallPaperUrls[index]
    if(index<wallPaperUrls.length-1){
      index++
    } else{
      index = 0
    }
    return url
  }
}

const backgroundSetter = backgroundSetterClosure()

function BannerBlock() {
  return (
    <ParallaxBackgroundDiv wallPaperIndex={backgroundSetter()}>
      <BannerDiv>
        <h1>GithubRepo of york870198</h1>
      </BannerDiv>
    </ParallaxBackgroundDiv>
  )
}

function RepoBlock({ repo }){
  const repoInfoRef = useRef(null)
  const { name, html_url, contents_url, description } = repo
  const [readme, setReadme] = useState('')
  const [inAnimation, SetInAnimation] = useState(false)

  function getReadMe(){
    let contentApiUrl = contents_url.replace('{+path}','README.md')
    fetch(contentApiUrl, {
      mode: 'cors'
    })
    .then(res => res.json())
    .then(jsonData => {
      if(jsonData.content){
        return jsonData.content
      } else {
        return ''
      }
    })
    .then(readmeEncoded => contentDecoder(readmeEncoded))
    .then(readmeStr => setReadme(readmeStr))
  }

  function contentDecoder(str){
    return decodeURIComponent(escape(window.atob(str)))
  }

  useEffect(()=>{
    if(contents_url){
      getReadMe()
    }
    window.addEventListener('scroll', (e)=>{
      if(repoInfoRef.current.getBoundingClientRect().y < (window.innerHeight * 0.9)){
        SetInAnimation(true)
      }
    })
  },[])

  return (
    <RepoDiv ref={repoInfoRef}>
      <RepoInfoDiv>
        <CSSTransition in={inAnimation} timeout={300} classNames="fade">
          <div>
            <a target="_blank" href={html_url}>{html_url}</a>
          </div>
        </CSSTransition>
        <CSSTransition in={inAnimation} timeout={300} classNames="fade">
          <div>
            {description}
          </div>
        </CSSTransition>
      </RepoInfoDiv>
      <CSSTransition in={inAnimation} timeout={300} classNames="fade">
        <RepoReadMeDiv>
          {(readme)? <ReactMarkdown children={readme} /> : <p>This repository does not have a README.md file.</p>}
        </RepoReadMeDiv>
      </CSSTransition>
    </RepoDiv>
  )
}

function App() {
  const [repoList, setRepoList] = useState([])
  function getGithubApi(){
    fetch('https://api.github.com/users/york870198/repos', {
      mode: 'cors'
    })
    .then(res=>{
      if(res.status === 200){
        return res.json()
      } else {
        return [{
          name:'Something went wrong.',
          html_url: 'https://github.com/york870198',
          description: 'Seems like github api rejected the request.'
        }]
      }
    })
    .then(jsonData=>{
      setRepoList(jsonData)
    })
  }

  useEffect(()=>{
    getGithubApi()
  },[])
  return(
    <AppDiv>
      <BannerBlock/>
      {(repoList.length > 0) && repoList.map((repo)=>{
        return (<React.Fragment key={`repoId-${repo.id}`}>
          <ParallaxBackgroundDiv wallPaperIndex={backgroundSetter()}>
            <RepoNameH1>{repo.name}</RepoNameH1>
            <RepoBlock repo={repo} />
            <div/>
          </ParallaxBackgroundDiv>
        </React.Fragment>)
      })}
    </AppDiv>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))