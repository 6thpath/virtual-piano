import { StrictMode } from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'

import './assets/styles/index.css'

import { Unavailable } from 'components/Unavailable'
import { App } from 'components/App'

import { reportWebVitals } from 'utils'

const isSafari =
  navigator.vendor?.indexOf('Apple') > -1 &&
  navigator.userAgent?.indexOf('CriOS') == -1 &&
  navigator.userAgent?.indexOf('FxiOS') == -1

const mountPoint = document.getElementById('mountPoint')
if (isSafari) {
  render(<Unavailable />, mountPoint)
} else {
  render(
    <StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </StrictMode>,
    mountPoint
  )
}

reportWebVitals(console.debug)
