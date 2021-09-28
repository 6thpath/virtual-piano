import { StrictMode } from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'

import './assets/styles/index.css'

import { App } from 'components/App'

import { reportWebVitals } from 'utils'

render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('mountPoint')
)

reportWebVitals(console.debug)
