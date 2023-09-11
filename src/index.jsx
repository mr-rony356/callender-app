import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Right from './Right'

document.addEventListener('DOMContentLoaded', function() {
  createRoot(document.body.appendChild(document.createElement('div')))
    .render(<Right />)
})
